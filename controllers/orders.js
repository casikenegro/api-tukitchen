const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");
const { default: axios } = require("axios");
const { objectToFormData } = require("../utils/functions");
const crypto = require("crypto-js");
const { paginate, sendMessage} = require("../utils/functions");


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
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array()})
        }
        if(!req.body.products.length){
            return res.status(400).send({message:"products is void"});
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
        if(req.body.cupons){
            if(req.body.cupons.length > 0){
                await models.Cupons.update({ is_used: true},{ where: { id: req.body.cupons } });
                const cupons = req.body.cupons.map((cupon)=>{
                    return {order_id:order.id, cupon_id: cupon}
                });
                await models.OrderCupons.bulkCreate(cupons);
            }
        }
        await models.OrderProducts.bulkCreate(products);
        await sendMessage(user.id);
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
        order.save()
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
