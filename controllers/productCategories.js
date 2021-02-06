const { validationResult } = require("express-validator");
const models = require('../models');

const get = async (req,res) => {
    const productCategories = await models.ProductCategories.findAll({where:{ product_id: req.params.id }});
    return res.status(200).send(productCategories);
}
const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const { product_id, categories } = req.body;
  await models.ProductCategories.destroy({where: { product_id }});
  const payload = categories.map((category_id)=>{
    return { product_id, category_id };
  });
  const productCategories = await models.ProductCategories.bulkCreate(payload);
  return res.status(200).send(productCategories);
}

module.exports = {
  get,
  create,
}
