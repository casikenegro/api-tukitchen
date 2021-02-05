const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");
const constants = require("../utils/constants");

const attributes = [
  'rut','role','id'
]

const get = async (req,res) => {
    const payload = await returnUserByToken(req);
    const user = await models.User.findOne({where: { id: payload.id }, include: ['profile','user_address'], attributes});
    return res.send(user);
}

const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  req.body.password = bcrypt.hashSync(req.body.password,10);  
  if(constants.roles.indexOf(req.body.role) === -1){
    return res.status(404).send("role not exist");
  }
  if(constants.roles.indexOf(req.body.role) === 0){
    const user = await returnUserByToken(req);
    if(user.role !== "ADMINISTRADOR") return res.status(403).json({message: 'Forbidden' })
  }
  const user = await models.User.create({...req.body});
  return res.send(user);
}

const update =  async (req,res) => {
  let  user = await returnUserByToken(req);
  if(req.body.password){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  }

  if(req.body.role){
    if(user.role !== "ADMINISTRADOR") return res.status(403).json({message: 'Forbidden, the rol not update' })
  }
  user.update({...req.body });
  user.save();
  return res.status(200).send({message:"success"});
}

async function destroy(req,res){
  const payload = await returnUserByToken(req);
  const t = await models.sequelize.transaction()
  try {
    await models.UserAddress.destroy({where: {id_user:payload.id}, transaction: t})
    await models.Profile.destroy({where: {id_user:payload.id}, transaction: t})
    await models.User.destroy({where: {id: payload.id}, transaction: t})
    await t.commit()
    res.json({message: "success"})
  } catch (e) {
    console.log(e);
    await t.rollback()
    res.status(500).json({message : "error"})
  }
}

module.exports = {
  get,
  create,
  update,
  destroy,
}
