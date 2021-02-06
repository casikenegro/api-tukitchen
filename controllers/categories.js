const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  const { status, user_id, is_premium, product_id , word, get_products , page, id} = req.query;

  if(get_products){
    let products = null ; 
    let whereProducts = {
      status: status || 1,
    }
    if(product_id)whereProducts = { ...whereProducts, product_id };
    if(user_id) whereProducts = { ...whereProducts, user_id };
    if(is_premium) whereProducts = { ...whereProducts,is_premium};
    if(word) whereProducts = {
      ...whereProducts,
      [models.Op.or] : [
        {name : {[models.Op.substring] : word} }, {description : {[models.Op.substring] : word} }
      ],
    }
    products = {
      model: models.Product,
      as: 'product',
      where: { ...whereProducts },
      include : ['gallery']
    }
  }
  let whereCategories = {}
  if(id) whereCategories = {...whereCategories, id }
  if(user_id) whereCategories = {...whereCategories, user_id }
  const categories = await models.Categories.paginate({
      where : { ...whereCategories },
      include,
      page : page || 1
  });
  return res.status(200).send(categories);
}

const create = async (req,res) => {
  const errors = validationResult(req);
  const  user = await returnUserByToken(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const category = await models.Categories.create({
    ...req.body,
    user_id:user.id
  });
  return res.status(200).send(category);
}

const update =  async (req,res) => {
  const { id } = req.params;
  const category = await models.Categories.findOne({where:{ id }});
  if(!category) return res.status(404).send({ message:"bad id" });
  category.update({
      ...req.body
  })
  category.save()
  return res.status(200).send(category);
}

async function destroy(req,res){
  const { id } = req.params;
  await models.Categories.delete({where:{ id }});
  return res.status(200).send({ message:"success" });
}


module.exports = {
  get,
  create,
  update,
  destroy,
}
