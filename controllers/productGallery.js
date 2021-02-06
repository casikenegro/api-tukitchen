const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');
const models = require('../models');

const create = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).send({ errors: errors.array()})
    }
    let product = await models.Product.findOne({where: {id : req.body.product_id }});
    if(!req.file) res.status(400).send("image is required"); 
    if(!product){
        product = await models.ProductGallery.create({
        ...req.body,
        img_product: req.file.filename,
      });
      return res.send(profile);
    }
    fs.unlinkSync(path.join(__dirname,`../public/uploads/${req.file.filename}`))
    res.status(400).send("product not  exist");
}

const update =  async (req,res) => {
    let product = await models.ProductGallery.findOne({ where: { id } });
    if(req.file) {
    fs.unlinkSync(path.join(__dirname,`../public/uploads/${product.img_product}`))
    req.body.img_product = req.file.filename;
    }
    product.update({ ...req.body });
    product.save();
    return res.send(product);
}

async function destroy(req,res){
  const { id } = req.params;
  const product = await models.UserAddress.findOne({where:{ id }});
  if(product.img_product){
    fs.unlinkSync(path.join(__dirname,`../public/uploads/${product.img_product}`))
  }
  await product.delete()
  return res.status(200).send({ message:"success" });
}

module.exports = {
  create,
  update,
  destroy,
}
