const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => { 
    const { page, profile_id, user_id} = req.query;
    const  user = await returnUserByToken(req);
    if(!user_id && !profile_id){
        return res.status(400).send({ message:"difine your role" });
    }
    let where = {};
    if(profile_id){
        const profile = await models.Profile.findOne({where: { user_id : user.id }})
        if(!profile) return res.status(400).send({ message:"user not is VENDEDOR" });
        where = {
            ...where,
            profile_id: profile.id
        }
    }
    if(user_id){
        where = {
            ...where,
            user_id: user.id
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
    await models.OrderProducts.bulkCreate(products);
    return res.status(200).send(order);
}

const update =  async (req,res) => {
    const { id } = req.params;
    const orders = await models.Orders.findOne({where:{ id }});
    if(!orders) return res.status(404).send({ message:"bad id" });
    orders.update({
        ...req.body
    })
    orders.save()
    return res.status(200).send(orders);
}

async function destroy(req,res){
    const { id } = req.params;
    await models.Orders.destroy({where:{ id }});
    return res.status(200).send({ message:"success" });
}


module.exports = {
  get,
  create,
  update,
  destroy,
}
