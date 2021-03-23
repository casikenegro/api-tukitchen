const models = require('../models');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mail = require('../utils/mail');
const utils = require('../utils/constants');

async function login(req,res){
  try {
    const { rut,password } = req.body
    const user = await models.User.findOne({ where: {rut}, include:['profile']});
    if(!user)  return res.status(404).send({message:"User not exist"});
    if(bcrypt.compareSync(password,user.password)){
      delete user.dataValues.password;
      return res.status(200).send({
        user, 
        token:jwt.sign({ id: user.id},utils.secretTokenKey,{
          expiresIn: 86400, // 24 hours
        }),
      });
    }
    return res.status(403).send({message:"Forbidden"});
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function recover_password(req,res){
  try {
    if(emailValidator.validate(req.body.email)){
      let user  = await models.User.findOne({
        include: [{
          model : models.Profile,
          where: {email : req.body.email},
          required: true,
          as: 'profile'
        }]
      })
      if(!user){
        res.status(422).json({message: "No se encontro ningún usuario con ese correo"})
      }else{
        let password = Math.random().toString().substring(2).substr(0,6)
        let password_encrypt  = bcrypt.hashSync(password,10)
        let message = "Ha solicitado cambio de contraseña, se ha reestablecido su password a : "+password+" .\nNo se olvide de cambiar su contraseña cuando ingrese al sistema."
        await mail.send(req.body.email,message,'Cambio de contraseña')
        await models.User.update({password: password_encrypt},{where: {id : user.id}})
        //user.update({password : password_encrypt})
        res.json({message: "Su nueva contraseña ha sido enviada a su correo"})
      }
    }else{
      res.status(422).json({message: "El correo suplido tiene un formato incorrecto"})
    }
  } catch (e) {
    res.status(500).json({message: "Ha ocurrido un error, contacte con soporte"})
  }
}

module.exports = {
  login,
  recover_password
}
