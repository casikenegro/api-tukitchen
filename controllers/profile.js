const models = require('../models');
const emailValidator = require('email-validator');
const fs = require('fs');
const bcrypt = require('bcrypt');

function get(req,res){
  models.Profile.findOne({where: {id_user : req.user.id}}).then(result => {
    res.json({profile: result})
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

async function create(req,res){
  if(req.body.email){
    if(!emailValidator.validate(req.body.email)){
      res.status(422).json({message: "El email proporcionado no posee formato de correo valido"})
      return
    }
  }
  const t = await models.sequelize.transaction()
  try {
    const id_user = req.user.id
    req.body.id_user = id_user
    let addresses = req.body.addresses ? req.body.addresses : []
    if(req.body.addresses) delete req.body.addresses
    req.body.img_profile = req.file ? req.file.filename : ""
    let profile = await models.Profile.findOrCreate({ where: {id_user}, defaults: req.body, transaction : t})
    if(profile[1]){
      let promises = []
      addresses.forEach((item, i) => {
        promises.push(
          models.UserAddress.create({id_user : id_user,secret_key: req.body.secret_key,api_key: req.body.api_key,name_store : req.body.name_store,latitude: item.latitude,longitude: item.longitude,address: item.address, description : item.description, city : item.city},{transaction: t})
        )
      });
      await Promise.all(promises)
      await t.commit()
      res.json({message: "Perfil creado con éxito"})
    }else{
      throw new Error('Ya existe un perfil creado para este usuario')
    }
  } catch (e) {
    console.log(e);
    await t.rollback()
    if(req.file){
      fs.unlinkSync(req.file.path)
    }
    let array_validation = ['Ya existe un perfil creado para este usuario']
    if(array_validation.includes(e.message)){
      res.status(422).json({message: e.message})
    }else{
      res.status(422).json({message: "Error contacte con soporte"})
    }
  }

}

async function update(req,res){

  if(req.body.email){
    if(!emailValidator.validate(req.body.email)){
      res.status(422).json({message: "El email proporcionado no posee formato de correo valido"})
      return
    }
  }
  const id = req.params.id

  const t = await models.sequelize.transaction()
  try {
    let addresses = req.body.addresses ? req.body.addresses : []
    if(req.body.addresses) delete req.body.addresses
    let profile = await models.Profile.findOne({where : {id}})
    req.body.img_profile = req.file ? req.file.filename : ""
    await profile.update(req.body,{ transaction: t })
    await models.UserAddress.destroy({where : {id_user : profile.dataValues.id_user}, transaction : t})
    let promises = []
    addresses.forEach((item, i) => {
      promises.push(
        models.UserAddress.create({id_user : profile.dataValues.id_user,secret_key: req.body.secret_key,api_key: req.body.api_key,name_store : req.body.name_store,latitude: item.latitude,longitude: item.longitude,address: item.address, description : item.description, city : item.city},{transaction: t})
      )
    });
    await Promise.all(promises)
    await t.commit()
    res.json({message: "Perfil modificado con éxito"})
  } catch (e) {
    console.log(e);
    await t.rollback()
    if(req.file){
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({message: "Error, contacte con soporte"})
  }
}

async function updateAdmin(req,res){
  if(req.body.password !== req.body.password_repeat){
    res.status(422).json({message: "Error, las contraseñas no coinciden"})
    return
  }
  try {
    let objectUser = {
    }

    if(req.body.password){
      objectUser.password = bcrypt.hashSync(req.body.password,10)
    }
    if(Object.keys(objectUser).length > 0) await models.User.update(objectUser,{where: {id : req.user.id}})

    let objectUpdate = {
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      id_user: req.user.id
    }

    let profile = await models.Profile.findOrCreate({where:{id_user: req.user.id}, defaults: objectUpdate})
    if(!profile[1]){
      await profile[0].update(objectUpdate)
    }
    res.json({})

  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Error, contacte con soporte"})
  }

}

module.exports = {
  get,
  create,
  update,
  updateAdmin
}
