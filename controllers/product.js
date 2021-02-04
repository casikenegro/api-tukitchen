const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  const { status, id_parent, is_premium, id_category , word, get_categories} = req.query;
  const offset = req.query.offset > 0 ? req.query.offset- 1 : 0;
  let whereProducts = {
    status: status || 1,
  }; 
  let categories = null ; 
  let include = ['gallery' ];
  if(id_parent) whereProducts = { ...whereProducts, id_parent };
  if(is_premium) whereProducts = { ...whereProducts,is_premium};
  if(word) whereProducts = {
    ...whereProducts,
    [models.Op.or] : [
      {name : {[models.Op.substring] : word} }, {description : {[models.Op.substring] : word} }
    ],
  }

  if(get_categories){
    let whereCategory = {};
    if(id_category) whereCategory = { ...whereCategory, id_category };
    categories = {
      model: models.ProductCategories,
      as: 'categories',
      where: { ...whereCategory },
      include : ['category']
    }
    include.push(categories);
  }
  
  const products = await models.Product.findAndCountAll({
      where : { ...whereProducts },
      include,
      offset,
      limit: 15,
  });
  return res.status(200).send(products);
}

async function create(req,res){
  const errors = validationResult(req);
  const  { id } = await returnUserByToken(req);
  console.log(id);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const product = await models.Product.create({
    ...req.body,
    id_parent: id
  });
  return res.status(200).send(product);  
}

async function update(req,res){



}

async function destroy(req,res){

}




module.exports = {
  get,
  create,
  update,
  destroy,
}
