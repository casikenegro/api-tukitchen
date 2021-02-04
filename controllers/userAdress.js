const { validationResult } = require("express-validator");
const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
    const  user = await returnUserByToken(req);
    const addresses = await models.UserAddress.findAll({where:{ id_user : user.id}});
    return res.status(200).send(addresses);
}
const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const address = await models.UserAddress.create({...req.body});
  return res.send(address);
}

const update =  async (req,res) => {
  const { id } = req.params;
  const address = await models.UserAddress.findOne({where:{ id }});
  address.update({
      ...req.body
  })
  address.save()
  return res.status(200).send(address);
}

async function destroy(req,res){
  const { id } = req.params;
  await models.UserAddress.delete({where:{ id }});
  return res.status(200).send({ message:"success" });
}

module.exports = {
  get,
  create,
  update,
  destroy,
}
