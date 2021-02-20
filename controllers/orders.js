const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");
const { default: axios } = require("axios");

const get = async (req,res) => { 
    const { page, is_buyer, is_seller, id} = req.query;
    const  user = await returnUserByToken(req);
    if(!is_seller && !is_buyer && user.role !== "ADMINISTRADOR"){
        return res.status(400).send({ message:"difine your role" });
    }
    let where = {};
    if(is_seller){
        const profile = await models.Profile.findOne({where: { user_id : user.id }})
        if(!profile) return res.status(400).send({ message:"user not is VENDEDOR" });
        where = {
            ...where,
            profile_id: profile.id
        }
    }
    if(is_seller){
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
    const include = [{
        model: models.OrderProducts,
        as: 'orderProducts',
        include : ['products']
    }]
    const orders = await models.Orders.paginate({
        where,
        include,
        page : page || 1
    });
    return res.status(200).send(orders);
    
}
/*
export const prepareFlowRequest = (params,secretKey, config = initConfig) => {

    const {
        as: type
    } = config

    //https://www.flow.cl/docs/api.html#section/Introduccion/Como-firmar-con-su-SecretKey
    const toSign = Object
        .keys(params)
        .sort()
        .map( key => `${key}${params[key]}`)
        .join("");
    //Create signature for payment
    const hash = crypto.HmacSHA256(
        toSign,
        secretKey
    );

    const s = hash.toString(crypto.enc.Hex);

    if( type === "formData" ) return objectToFormData({...params,s});
    if( type === "queryParameters") return {...params,s};

    return {...params,s}

}
*/
const updateStatusOrderByFlow = async (req,res) => {
    const { token, opcional } = req.body;
    const profile = await models.Profile.findOne({id: opcional.profile_id});
    const response = await axios({
        method: 'get',
        url: 'https://www.flow.cl/api/payment/getStatus',
        params:{
            token,
            apiKey: profile.api_key,
            s,
        }, 
    });
    let order = await models.Orders.findOne({
        where: {
            profile_id: profile.id,
            status: "IN-PROGRESS",
            user_id: opcional.user_id,
            total: opcional.total
        }
    });
    let payload = {
        reference: response.flowOrder
    }
    if(response.status > 2 ) {
        payload = {
            ...payload,
            status: "FAIL"
        }
    }
    if ( response.status === 2) {
        payload = {
            ...payload,
            status: "SUCCESS"
        }
    }
    order.update({ ...payload });
    order.save();
    return res.send({ message:"received"});
}
const create = async (req,res) => {
    const errors = validationResult(req);
    const  user = await returnUserByToken(req);
    if(!errors.isEmpty()){
        return res.status(422).send({ errors: errors.array()})
    }
    if(!req.body.products.length){
        return res.status(400).send({message:"products is void"});
    }
    const order = await models.Orders.create({
        ...req.body,
        user_id:user.id
    });
    const products = await Promise.all(req.body.products.map( async (item)=>{
            const  product = await models.Product.findOne({ where: {
                id: item.product_id,
                profile_id:req.body.profile_id
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
    return res.status(200).send(order);
}

const update =  async (req,res) => {
    const { id } = req.params;
    let order = await models.Orders.findOne({where:{ id }});
    if(!order) return res.status(404).send({ message:"bad id" });
    order.update({
        ...req.body
    })
    order.save()
    return res.status(200).send(order);
}

async function destroy(req,res){
    const { id } = req.params;
    await models.Orders.destroy({where:{ id }});
    return res.status(200).send({ message:"success" });
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
