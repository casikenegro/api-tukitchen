const { validationResult } = require("express-validator");
const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  const { status, user_id, is_premium, category_id , word, get_categories , page, id} = req.query;
  let whereProducts = {
    status: status || 1,
  };
  let categories = null ; 
  let include = ['gallery', {
    model: models.User,
    as: 'users',
    where: { status: true },
  }
  ];
  if(id)whereProducts = { ...whereProducts, id };
  if(user_id) whereProducts = { ...whereProducts, user_id };
  if(is_premium) whereProducts = { ...whereProducts,is_premium};
  if(word) whereProducts = {
    ...whereProducts,
    [models.Op.or] : [
      {name : {[models.Op.substring] : word} }, {description : {[models.Op.substring] : word} }
    ],
  }

  if(get_categories){
    let whereCategory = {};
    if(category_id) whereCategory = { ...whereCategory, category_id };
    categories = {
      model: models.ProductCategories,
      as: 'product_categories',
      where: { ...whereCategory },
      include : ['categories']
    }
    include.push(categories);
  }
  
  const products = await models.Product.paginate({
      where : { ...whereProducts },
      include,
      page : page || 1
  });
  return res.status(200).send(products);
}

async function create(req,res){
  const errors = validationResult(req);
  const  { id } = await returnUserByToken(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const product = await models.Product.create({
    ...req.body,
    user_id: id
  });
  return res.status(200).send(product);  
}

async function update(req,res){
  const user = await returnUserByToken(req);
  let product = await models.Product.findOne({ where: { user_id: user.id, id: req.params.id } });
  if(!product) return res.status(400).send({message:"bad request"});
  product.update({ ...req.body });
  product.save();
  return res.send(product);
}

async function destroy(req,res){
  try {
    const user = await returnUserByToken(req);
    await models.Product.destroy({ where: { user_id: user.id, id: req.params.id } });
    return res.send({message:"success"});
  } catch (error) {
   return res.status(500).send({ message:"oh no, bad request"}); 
  }
}

module.exports = {
  get,
  create,
  update,
  destroy,
}