const { validationResult } = require("express-validator");
const models = require('../models');

const get = async (req,res) => {
    const productCategories = await models.ProductCategories.findAll({where:{ id_product: req.params.id }});
    return res.status(200).send(productCategories);
}
const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const { id_product, categories } = req.body;
  await models.ProductCategories.destroy({where: { id_product }});
  const payload = categories.map((id_category)=>{
    return { id_product, id_category };
  });
  const productCategories = await models.ProductCategories.bulkCreate(payload);
  return res.status(200).send(productCategories);
}

module.exports = {
  get,
  create,
}
