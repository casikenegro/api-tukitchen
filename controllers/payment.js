const models = require('../models');
const CryptoJS = require('crypto-js');
const constants = require('../utils/constants');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const func = require('../utils/functions');
const handlebars = require('handlebars');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fields = require('../utils/fields');

function get(req,res){
  const id = req.params.id
  const id_rol = req.user.id_rol
  let where  = id_rol === 2 ? {id_buyer : req.user.id} : id_rol === 3 ? {id_seller : req.user.id} : {}
  if(id){
    where.id = id
    models.Payment.findOne({where,include : ['carrier','products',
      {
        model: models.User,
        as: "seller",
        include: ['roles','profile','addresess'],
        attributes: fields.userFields,
      },
      {
        model: models.User,
        as: "buyer",
        attributes: fields.userFields,
        include: ['roles','profile','addresess']
      }
    ]}).then(result =>{
      res.json(result)
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }else{
    models.Payment.findAll({where,include : ['carrier','products',
      {
        model: models.User,
        as: "seller",
        attributes: fields.userFields,
        include: ['roles','profile','addresess']
      },
      {
        model: models.User,
        as: "buyer",
        attributes: fields.userFields,
        include: ['roles','profile','addresess']
      }
    ]}).then(result =>{
      res.json(result)
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }
}

function getByStatus(req,res){
  const status = req.params.status
  const id_rol = req.user.id_rol
  let where  = id_rol === 2 ? {id_buyer : req.user.id} : id_rol === 3 ? {id_seller : req.user.id} : {}
  where.status = status
  models.Payment.findAll({where,include : ['carrier','products',
    {
      model: models.User,
      as: "seller",
      attributes: fields.userFields,
      include: ['roles','profile','addresess']
    },
    {
      model: models.User,
      as: "buyer",
      attributes: fields.userFields,
      include: ['roles','profile','addresess']
    }
  ]}).then(result =>{
    res.json(result)
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

async function create(req,res){
  const { body } = req

  const t = await models.sequelize.transaction()
  try {
    const profile = await models.Profile.findOne({where : {id_user : req.body.id_seller}})
    let correlativeSeller = await models.PaymentCorrelative.findOrCreate({where : {id_seller : req.body.id_seller}, defaults: {id_seller: req.body.id_seller, correlative: 1}, transaction: t})
    let addressBuyer = await models.UserAddress.findOne({where : {id : req.body.id_address}})

    let number_order  = correlativeSeller[0].dataValues.correlative.toString().padStart(5,0)
    const commerceOrder = profile.dataValues.name_store+'-'+number_order

    if(profile.dataValues.api_key && profile.dataValues.email && profile.dataValues.secret_key){
      let objectPost = {
        amount : req.body.amount,
        apiKey : profile.dataValues.api_key,
        commerceOrder,
        currency: "CLP",
        email : profile.dataValues.email,
        subject: "Pago de orden : "+commerceOrder,
        urlConfirmation: constants.api_url+"payment_confirmation_flow_url",
        urlReturn: "https://tukitchen.cl/gracias-por-compra/",
      }
      let flowResponse = sendFlowRequest(objectPost,profile.dataValues.secret_key)
      flowResponse.then(res => res.json())
      .then( async json =>{

          if(Object.keys(json).length > 2){
            let payment = await models.Payment.create({
              id_seller : req.body.id_seller,
              id_buyer: req.user.id,
              amount : req.body.amount,
              payment_method: "Flow",
              number_order: commerceOrder,
              send_address: addressBuyer.dataValues.address,
              city: addressBuyer.dataValues.city,
              value_of_send: req.body.value_of_send,
              id_carrier : req.body.id_carrier,
              amount_discount_coupons: req.body.amount_discount_coupons,
              flow_order_payment : json.flowOrder,
              token_flow: json.token,
            },{transaction: t})

            let array_promise = []

            req.body.products.forEach((item, i) => {
                array_promise.push(
                  models.PaymentProducts.create({
                    id_product: item.id,
                    id_payment: payment.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    time_for_preparation: item.time_for_preparation,
                    is_premium: item.is_premium,
                    quantity: item.quantity,
                    total: item.price * item.quantity
                  },{transaction: t})
                )
            });

            await Promise.all(array_promise)
            await models.PaymentCorrelative.update({correlative : correlativeSeller[0].correlative + 1},{where: {id: correlativeSeller[0].id}, transaction: t})
            await t.commit()
            res.json({payment, flowResponse : json, flow: true})
          }else{
            res.status(422).json({message : "Error procesando su pago, si este error persiste contacte con soporte"})
          }
      }).catch(err => {
        console.log(err);
        res.status(422).json({message : "Error procesando su pago, si este error persiste contacte con soporte"})
      });


    }else{
      let payment = await models.Payment.create({
        id_seller : req.body.id_seller,
        id_buyer: req.user.id,
        amount : req.body.amount,
        payment_method: "Flow",
        number_order: commerceOrder,
        send_address: addressBuyer.dataValues.address,
        city: addressBuyer.dataValues.city,
        value_of_send: req.body.value_of_send
      },{transaction: t})

      let array_promise = []

      req.body.products.forEach((item, i) => {
          array_promise.push(
            models.PaymentProducts.create({
              id_payment: payment.id,
              name: item.name,
              description: item.description,
              price: item.price,
              time_for_preparation: item.time_for_preparation,
              is_premium: item.is_premium,
              quantity: item.quantity,
              total: item.price * item.quantity
            },{transaction: t})
          )
      });

      await Promise.all(array_promise)
      await models.PaymentCorrelative.update({correlative : correlativeSeller[0].correlative + 1},{where: {id: correlativeSeller[0].id}, transaction: t})
      await t.commit()
      res.json({payment, flowResponse : {}, flow: false})
    }
  } catch (e) {
    console.log(e);
    await t.rollback()
    res.status(500).json({message: "Error, contacte con soporte"})
  }
}

async function changeStatus(req,res){
  const id = req.params.id

  models.Payment.update({status: req.body.status},{where: {id}}).then(result => {
    if(result[0]){
      printPdfPayment(id,req,res)
    }else{
      res.status(422).json({message: 'Error, no se pudo actualizar el registro intente de nuevo'})
    }
  }).catch(err => {
    console.log(err,'aqui==========================')
    res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function sendFlowRequest(object, secret_key){

  //let string_signature = 'amount'+body.amount+'apiKey'+profile.dataValues.api_key+'commerceOrder'+'000001'+'email'+profile.dataValues.email+'subjectCompra a traves de kiphu'
  //string_signature+= 'urlConfirmationhttp://localhost:5000/payment_confirmationurlReturnhttp://localhost:5000/payment_return'
  //let string_signature = "amount1000apiKey58929F9A-770E-4ED0-9134-52E11LCBD727commerceOrder646822currencyCLPemailcsepulveda@tuxpan.comsubjectPago de prueba POSTMANurlConfirmationhttp://flowosccomerce.tuxpan.com/csepulveda/api2/pay/confirmPay.phpurlReturnhttp://flowosccomerce.tuxpan.com/csepulveda/api2/pay/resultPay.php"
  //let signature_payment = "532666468b7e6c537dab0766e17b16cc48f6913cc4abc1ff22361203c976eda7"

  let string_signature = ""
  let formData = new FormData()

  Object.keys(object).forEach((item, i) => {
    string_signature+= item+object[item]
    formData.append(item,object[item])
  });
  let signature_payment  = CryptoJS.HmacSHA256(string_signature,secret_key).toString(CryptoJS.enc.Hex);
  object.s = signature_payment
  formData.append('s',signature_payment)

  return fetch(constants.flow_url+'/payment/create', {
       method: 'post',
       body:    formData
   })
}

async function printPdfPayment(id,req,res){
  //p de payment
  let p = await models.Payment.findOne({where: {id},include : ['carrier','products',
    {
      model: models.User,
      as: "seller",
      include: ['roles','profile','addresess']
    },
    {
      model: models.User,
      as: "buyer",
      include: ['roles','profile','addresess']
    }
  ]})

  let fecha = moment().tz('America/Santiago').format('DD-MM-YYYY')
  const pathFile = path.join(__dirname,'../public/documents/templatePayment.html')

  func.readHtmlFile(pathFile,(err,htmlFile) => {
    if(err){
      console.log(err)
      res.status(500).json({message: "Error al generar el correo"})
    }else{

      handlebars.registerHelper('print_price', function (dataHelper) {
        return func.formatNumber(this.dataValues.price,2,',','.')
      })

      handlebars.registerHelper('print_total', function (dataHelper){
        let price = this.dataValues.price * this.dataValues.quantity
        return func.formatNumber(price,2,',','.')
      })

      handlebars.registerHelper('print_index', (dataHelper) => {
        return dataHelper.data.index + 1
      })

      const template = handlebars.compile(htmlFile);

      const replace = {
        logo : p.dataValues.buyer.dataValues.profile.dataValues.img_profile ? 'file:\\\\\\'+path.join(__dirname,'../public/img/profile/',p.dataValues.buyer.dataValues.profile.dataValues.img_profile) : '',
        buyer: p.dataValues.buyer.dataValues.profile.dataValues,
        seller: p.dataValues.seller.dataValues.profile.dataValues,
        products: p.dataValues.products,
        payment : p.dataValues,
        current_date : moment().tz('America/Santiago').format('DD-MM-YYYY'),
        print_total_product: func.formatNumber(p.dataValues.amount,2,',','.'),
      }

      const htmlToSend = template(replace)
      const name_file_pdf = Date.now()+`_${p.dataValues.number_order}_payment.pdf`
      const path_to = path.join(__dirname,'../public/documents/pdf/'+name_file_pdf)

      let config_footer = {
        "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait", // portrait or landscape
        "header": {
          "height": "53mm",
        },
        "footer": {
          "height": "28mm",
          "contents": {
            default: '<div class="div_footer"><div class="div_totales text-right"><span class="negritas">Página {{page}} de {{pages}}</span></div>', // fallback value
          }
        },
        "zoomFactor": "1", // default is 1
        "type": "pdf",             // allowed file types: png, jpeg, pdf
        "quality": "75",           // only used for types png & jpeg,
      }

      pdf.create(htmlToSend, config_footer).toFile(path_to, async (err, result) => {
        if(err){
          console.log(err);
          res.status(500).json({ message : 'Error, contacte con soporte'})
        }else{
          await models.Payment.update({name_pdf: name_file_pdf},{where: {id}})
          res.json({pdf: 'documents/pdf/'+name_file_pdf})
        }
      });
    }
  })
}

function getConfirmationFlow(req,res){
  const token = req.body.token 
  models.Payment.update({status: 2},{where: {token_flow : token}})
}

module.exports = {
  create,
  get,
  getByStatus,
  changeStatus,
  getConfirmationFlow
}
