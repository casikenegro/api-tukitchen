const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

const fields = require("../utils/fields")
const models = require('../models');
const { returnUserByToken } = require("../middleware");
const attributes = [
  'rut','dv','id_rol','id_parent','id'
]

const get = async (req,res) => {
    const payload = await returnUserByToken(req);
    const user = await models.User.findOne({where: { id: payload.id }, include: ['roles','profile','user_address'], attributes: fields.userFields});
    return res.send(user);
}
const getAll = async (req,res) => {
  const users = await models.User.findAll({include: ['roles','profile','addresess'], attributes: fields.userFields});
  return res.status(200).send(users);
}
function get_sellers(req,res){  
  models.User.findAll({include: ['roles',{
    model : models.Profile,
    as : "profile",
    required:  false,
  },'addresess'], attributes,
    where: {id_rol: 3}
  }).then(result => {
    res.json({sellers: result})
  }).catch(err => {
     console.log(err)
     res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  req.body.password = bcrypt.hashSync(req.body.password,10);
  const rut = req.body.rut.split('-')[0]
  const dv = req.body.rut.split('-')[1]
  const id_parent = null
  if(req.body.id_rol == 1 ){
    const user = await returnUserByToken(req);
    if(user.id_rol !== 1) return res.status(403).json({message: 'Forbidden' })
  }
  models.User.findOrCreate({
    where: {rut, dv},
    defaults: {
      rut,
      dv,
      password: req.body.password,
      id_rol: req.body.id_rol || 2,
      id_parent
    }
  }).then(([user,created]) => {
    if(created){
      res.json({message: "usuario creado con éxito"})
    }else{
      res.status(422).json({message : "Error, el rut de este usuario ya esta en uso "})
    }
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

const update =  async (req,res) => {
  let  user = await returnUserByToken(req);
  if(req.body.password){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  }
  if(req.body.rut){
    req.body.dv = req.body.rut.split('-')[1];
    req.body.rut = req.body.rut.split('-')[0];
  }
  if(req.body.id_rol){
    if(user.id_rol !== 1) return res.status(403).json({message: 'Forbidden, the rol not update' })
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
    res.json({message: "Usuario eliminado con éxito"})
  } catch (e) {
    console.log(e);
    await t.rollback()
    res.status(500).json({message : "Error no se puedo "})
  }
}

module.exports = {
  get,
  create,
  update,
  destroy,
  get_sellers,
}
