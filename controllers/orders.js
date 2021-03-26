const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");
const { default: axios } = require("axios");
const { objectToFormData } = require("../utils/functions");
const crypto = require("crypto-js");
const { paginate, sendMessage} = require("../utils/functions");
const { sendMail } = require('../utils/email');

const get = async (req,res) => { 
    try {
        const { page, id,not_paginate,size, status} = req.query;
        const  user = await returnUserByToken(req);  
        const order =[['id', 'DESC']];
        let where = {};
        if(user.role === "VENDEDOR"){
            const profile = await models.Profile.findOne({where: { user_id : user.id }})
            if(!profile) return res.status(400).send({ message:"user not profile" });
            where = {
                ...where,
                profile_id: profile.id,
            }
        }
        if(user.role === "COMPRADOR"){
            where = {
                ...where,
                user_id: user.id
            }
        }
        if(id){
            where = {
                ...where,
                id,
            }
        }
        if(status){
            where = {
                ...where,
                status,
            }
        }
        const include = [{
            model: models.OrderProducts,
            as: 'orderProducts',
            include : ['products']
        }]
        let orders;
        if(!!not_paginate){
            orders = await models.Orders.findAll({
                where,
                include,
                order
            });
        }else{
            orders = await paginate(models.Orders,page,size,where,include,{order});
        }
        return res.status(200).send(orders);   
    } catch (error) {
        return res.status(500).send(error);
    }  
}

const prepareFlowRequest = (params,secretKey, config) => {
    const toSign = Object
        .keys(params)
        .sort()
        .map( key => `${key}${params[key]}`)
        .join("");
    const hash = crypto.HmacSHA256(
        toSign,
        secretKey
    );
    const s = hash.toString(crypto.enc.Hex);
    if(config === `GET` ) return objectToFormData({...params,s});
    return {...params,s}

}

const updateStatusOrderByFlow = async (req,res) => {
    try {
        const { order_id } = req.body;
        const order = await models.Orders.findOne({ where : { id : order_id}});
        if(!order) return res.status(400).send({ message: `order_id not exist `});
        const profile = await models.Profile.findOne({id: order.profile_id});
        const params = prepareFlowRequest({ apiKey: profile.api_key,commerceId: order.reference },profile.secretKey,`GET`);
        const response = await axios({
            method: 'get',
            url: 'https://www.flow.cl/api/payment/getStatusByCommerceId',
            params, 
        });
        if(response.code == 400 || response.code == 400 )    
            return res.status(400).send({ message:"bad request"});
        if(response.status === 2 ){
            order.update({
                status: "SUCCESS", 
                stage:"IN-PROGRESS"
            });
            order.save();
        }
        if(response.status === 3 ){
            order.update({
                status: "FAIL"
            });
            order.save();
        }
        if(response.status === 4 ){
            order.update({
                status: "REJECT"
            });
            order.save();
        }
        return res.status(200).send(order);
    }catch(error){
        return res.status(500).send(error);
    }
}
const create = async (req,res) => {
    try {
        const errors = validationResult(req);
        const  user = await returnUserByToken(req);
        let coupon = null;
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array()})
        }
        if(!req.body.products.length){
            return res.status(400).send({message:"products is void"});
        }
        if(req.body.coupon){
            coupon = await models.Cupons.findOne({where: { name : req.body.coupon }});  
            if(coupon){
                if(coupon.is_used) return res.status(400).send({message:"coupon used"});
            }        
        }
        const product = await models.Product.findOne({where:{ id: req.body.products[0].product_id}});
        const { profile_id } = product.dataValues;
        const order = await models.Orders.create({
            ...req.body,
            profile_id,
            user_id:user.id
        });
        const products = await Promise.all(req.body.products.map( async (item)=>{
                const  product = await models.Product.findOne({ where: {
                    id: item.product_id,
                    profile_id
                }})
                if (!product) return null;
                return { 
                    ...item,
                    price: product.price, 
                    order_id: order.id
                }
            })); 
        if(coupon){
            await models.OrderCupons.create({order_id:order.id,cupon_id: coupon.id});
            coupon.update({
                is_used:true
            });
            coupon.save();
        }
        await models.OrderProducts.bulkCreate(products);
        const profile = await models.Profile.findOne({where:{id:profile_id}});
        const userProfile = await models.Profile.findOne({where:{user_id:user.id}});
        await sendMessage(profile.user_id,userProfile.name);
        return res.status(200).send(order);
    }catch(error){
        return res.status(500).send(error);
    }
}

const update =  async (req,res) => {
    try {
        const { id } = req.params;
        let order = await models.Orders.findOne({where:{ id }});
        if(!order) return res.status(404).send({ message:"bad id" });
        order.update({
            ...req.body
        })
        order.save();
        if(req.body.stage){
            const shop = await models.Profile.findOne({where: { id: order.profile_id}});
            const client  = await models.User.findOne({
                include: [{
                  model : models.Profile,
                  required: true,
                  as: 'profile'
                }],
                where:{id:order.user_id}
              });
            await sendMail({
                to: shop.email,
                template: "order-notification",
                subject:"estado de la orden",
                content: {
                    name:shop.name,
                    last_name:shop.last_name,
                    order_id:order.id,
                    stage:order.stage,
                },
            });
            await sendMail({
                to: client.dataValues.profile.email,
                template: "order-notification",
                subject:"estado de la orden",
                content: {
                    name:client.dataValues.profile.name,
                    last_name:client.dataValues.profile.last_name,
                    order_id:order.id,
                    stage:order.stage
                },
            });
        }
        return res.status(200).send(order);
    }catch(error){
        return res.status(500).send(error);
    }
}

async function destroy(req,res){
    try {
        const { id } = req.params;
        await models.Orders.destroy({where:{ id }});
        return res.status(200).send({ message:"success" });   
    } catch (error) {
        return res.status(500).send(error);   
    }
}

const flowRedirect = (req,res) => {

    const redirectURL = (req.query || {}).redirect_app 

    if(redirectURL)
        return res.redirect(redirectURL)

    return res.status(200).send({ 
        message:"Could not redirect, try to go to the app manually",
    });
}


module.exports = {
  get,
  create,
  update,
  destroy,
  updateStatusOrderByFlow,
  flowRedirect
}
