const models = require('../models');
const path = require('path');
const fs = require('fs');

const get = async (req,res) => {
  const products = await models.Product.findAll({where: { status : 1 }, include: ['gallery',{
        model: models.ProductCategories,
        as: 'categories',
        required: false,
        include : ['category']
      },{
        model: models.User,
        as: 'users',
        required: true,
        include : ['profile']
      },'inventary',"days_avialable"],
      order: [ ['id','DESC']
    ]
  });
  return res.status(200).send(products);
}

async function create(req,res){
  //const id_parent = func.getIdPadre(req.user)
  req.body.id_parent = id_parent
  const t = await models.sequelize.transaction()
  try {
    let categories = req.body.categories
    let days = req.body.days
    let inventary = req.body.inventary
    delete req.body.categories
    delete req.body.days
    delete req.body.inventary


    let product = await models.Product.create(req.body,{transaction: t})
    let promises = []
    if(req.files){
      promises = req.files.map((v,i) =>{
        return models.ProductGallery.create({id_product: product.id, name : v.filename},{transaction: t})
      })
    }
    if(categories){
      if(Array.isArray(categories)){
        categories.forEach((item, i) => {
          promises.push(
            models.ProductCategories.create({id_category: item, id_product: product.id},{transaction: t})
          )
        });
      }else{
        promises.push(
          models.ProductCategories.create({id_category: categories, id_product: product.id},{transaction: t})
        )
      }
    }

    if(days){
      if(Array.isArray(days)){
        days.forEach((item, i) => {
          promises.push(
            models.ProductDaysAvailable.create({day: item.toUpperCase(), id_product: product.id},{transaction: t})
          )
        });
      }else{
        promises.push(
          models.ProductDaysAvailable.create({day: days.toUpperCase(), id_product: product.id},{transaction: t})
        )
      }
    }
    inventary.forEach((item, i) => {
        promises.push(
         models.Inventary.create({
          stock: item.stock, hour_available: item.hour_available, is_repeat: item.is_repeat ? item.is_repeat : false, id_product: product.id
          },{transaction: t})
        )
    });
    await Promise.all(promises)
    await t.commit()
    res.json({message: "Producto creado con éxito"})
  } catch (e) {
    console.log(e);
    t.rollback()
    res.status(422).json({message: "error contacte con soporte "})
  }

}

async function update(req,res){
  let id = req.params.id
  let t = await models.sequelize.transaction()
  try {
    let categories = req.body.categories
    let days = req.body.days
    delete req.body.categories
    let product = await models.Product.update(req.body,{where: {id}, transaction: t})
    let promises = []
    if(req.files){
      promises = req.files.map((v,i) =>{
        return models.ProductGallery.create({id_product: id, name : v.filename},{transaction: t})
      })
    }

    if(categories){
      await models.ProductCategories.destroy({where: {id_product : id}, transaction: t})
      if(Array.isArray(categories)){
        categories.forEach((item, i) => {
          promises.push(
            models.ProductCategories.create({id_category: item, id_product: id},{transaction: t})
          )
        });
      }else{
        promises.push(
          models.ProductCategories.create({id_category: categories, id_product: id},{transaction: t})
        )
      }
    }

    if(days){
      await models.ProductDaysAvailable.destroy({where: {id_product : id}, transaction: t})
      if(Array.isArray(days)){
        days.forEach((item, i) => {
          promises.push(
            models.ProductDaysAvailable.create({day: item.toUpperCase(), id_product: id},{transaction: t})
          )
        });
      }else{
        promises.push(
          models.ProductDaysAvailable.create({day: days.toUpperCase(), id_product: id},{transaction: t})
        )
      }
    }

    await Promise.all(promises)
    await t.commit()
    res.json({message: "Producto modificado con éxito"})
  } catch (e) {
    console.log(e);
    t.rollback()
    res.status(422).json({message: "error contacte con soporte "})
  }

}

async function destroy(req,res){
  let t = await models.sequelize.transaction()
  try {
    let id = req.params.id
    await models.Product.update({status: false},{where: {id}, transaction: t})
    await t.commit()
    res.json({message: "Producto eliminado con éxito"})
  } catch (e) {
    console.log(e);
    await t.rollback()
    res.status(500).json({message: "El producto no ha sido eliminado porque puede que posea registros asociados a el o ha sido un error interno, si el error persiste contacte con soporte"})
  }
}

async function removeImgGallery(req,res){
  const {id, filename} = req.params
  try {
    let pathImg = path.join(__dirname,'../public/img/product/'+filename)
    fs.unlinkSync(pathImg)
    await models.ProductGallery.destroy({where: {id_product: id,name: filename}})
    res.json({message: "imagen eliminada con éxito"})
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Error, contacte con soporte"})
  }
}

function get_pagination(req,res){

  let {offset,limit} = req.params
  limit = limit ? parseInt(limit,10) : 10
  offset = parseInt(offset)

  if(!offset){
    req.status(422).json({message: "Error, el parametro de paginación es quererido"})
  }else if(offset === 1){
    offset = 0
  }else{
    offset = ((offset * limit) - limit)
  }

  models.Product.findAll({
    where: {status: 1, id_parent},
    include: ['gallery',{
      model: models.ProductCategories,
      as: 'categories',
      required: false,
      include : ['category']
    },{
      model: models.User,
      as: 'user',
      required: true,
      include : ['profile']
    },'inventary',"days_avialable"],
    order: [['id','DESC']],
    offset: offset,limit : limit,
  }).then(result => {
    res.json({products: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function getProductsByFilter(req,res){
  let where = ""
  if(req.body.id_category){
    where = `${req.body.id_category} IN (SELECT id_category from product_categories where id_product = product.id)`
  }
  if(req.body.id_seller){
    if(where === ""){
      where=  `product.id_parent = ${req.body.id_seller}`
    }else{
      where+=  ` AND product.id_parent = ${req.body.id_seller}`
    }
  }
  if(req.body.stock){
    if(where === ""){
      where=  `product.id IN (SELECT id_product from inventaries where stock >= ${req.body.stock})`
    }else{
      where+=  ` AND product.id IN (SELECT id_product from inventaries where stock >= ${req.body.stock})`
    }
  }
  if(req.body.lower_price){
    if(where === ""){
      where=  `product.price >= ${req.body.lower_price}`
    }else{
      where+=  ` AND product.price >= ${req.body.lower_price}`
    }
  }
  if(req.body.max_price){
    if(where === ""){
      where=  `product.price <= ${req.body.max_price}`
    }else{
      where+=  ` AND product.price <= ${req.body.max_price}`
    }
  }
  if(req.body.day_available){
    if(where === ""){
      where = `'${req.body.day_available.toUpperCase()}' IN (SELECT day from products_days_availables where id_product = product.id)`
    }else{
      where += ` AND '${req.body.day_available.toUpperCase()}' IN (SELECT day from products_days_availables where id_product = product.id)`
    }
  }

  if(req.body.hour_available){
    if(where === ""){
      where += `'${req.body.hour_available}' IN (SELECT hour_available from inventaries where id_product = product.id)`
    }else{
      where += ` AND '${req.body.hour_available}' IN (SELECT hour_available from inventaries where id_product = product.id)`
    }
  }

  if(where === ""){
    where += `product.status = 1`
  }else{
    where += ` AND product.status = 1`
  }

  models.Product.findAll({
    where: models.sequelize.literal(where),
    include: ['gallery',{
      model: models.ProductCategories,
      as: 'categories',
      required: false,
      include : ['category']
    },'inventary',"days_avialable"],
    order: [['id','DESC']],
  }).then(result => {
    res.json({products: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function getBySeller(req,res){
  const id = req.params.id
  models.Product.findAll({where : {id_parent : id, status: 1}, include: ['gallery',{
      model: models.ProductCategories,
      as: 'categories',
      required: false,
      include : ['category']
    },{
      model: models.User,
      as: 'user',
      required: true,
      include : ['profile']
    },'inventary',"days_avialable"],
    order: [ ['id','DESC']
  ]
  }).then(result => {
    res.json({products: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function getPremium(req,res){
  models.Product.findAll({where : {is_premium: true, status : 1}, include: ['gallery',{
      model: models.ProductCategories,
      as: 'categories',
      required: false,
      include : ['category']
    },'inventary',"days_avialable"],
    order: [ ['id','DESC']
  ]
  }).then(result => {
    res.json({products: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function getByWord(req,res){
  const word = req.params.word
  models.Product.findAll({where : {
    [models.Op.or] : [
      {name : {[models.Op.substring] : word} }, {description : {[models.Op.substring] : word} }
    ],
    status: 1,
  }, include: ['gallery',{
      model: models.ProductCategories,
      as: 'categories',
      required: false,
      include : ['category']
    },{
      model: models.User,
      as: 'user',
      required: true,
      include : ['profile']
    },'inventary',"days_avialable"],
    order: [ ['id','DESC']
  ]
  }).then(result => {
    res.json({products: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function getByCategory(req,res){

  const id = req.params.id
  models.Product.findAll({include: ['gallery',{
      model: models.ProductCategories,
      as: 'categories',
      required: true,
      where: {id_category : id, status : 1},
      include : ['category']
    },{
      model: models.User,
      as: 'user',
      required: true,
      include : ['profile']
    },'inventary',"days_avialable"],
    order: [ ['id','DESC'] ]
  }).then(result => {
    res.json({products: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

function updateStatus(req,res){
  const id = req.params.id
  models.Product.update({is_premium: req.body.is_premium},{where: {id}}).then(result =>{
    if(result[0]){
      res.json({})
    }else{
      res.status(422).json({message: 'Error, el producto no pudo ser modificado intente de nuevo'})
    }
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

module.exports = {
  get,
  create,
  update,
  destroy,
  removeImgGallery,
  get_pagination,
  getProductsByFilter,
  getBySeller,
  getPremium,
  getByWord,
  getByCategory,
  updateStatus
}
