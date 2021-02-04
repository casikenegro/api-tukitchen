const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
const emailValidator = require('email-validator');

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  const { id } = await returnUserByToken(req);
  const profile = await models.Profile.findOne({where: {id_user : id}});
  if(!profile) return res.status(404).send("profile not exist");
  return res.send(profile);
}

const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  if(req.body.email){
    if(!emailValidator.validate(req.body.email)){
      return res.status(422).json({message: "El email proporcionado no posee formato de correo valido"})
    }
  }
  const { id } = await returnUserByToken(req);
  let profile = await models.Profile.findOne({where: {id_user : id}});
  if(!req.file) res.status(400).send("image is required"); 
  if(!profile){
    let profile = await models.Profile.create({
      ...req.body,
      img_profile: req.file.filename,
      id_user: id,
    });
    return res.send(profile);
  }
  res.status(400).send("profile exist");

}

async function update(req,res){
  if(req.body.email){
    if(!emailValidator.validate(req.body.email)){
      res.status(422).json({message: "El email proporcionado no posee formato de correo valido"})
      return
    }
  }
  const { id } = await returnUserByToken(req);
  let profile = await models.Profile.findOne({ where: { id_user: id } });
  if(req.file) {
    fs.unlinkSync(path.join(__dirname,`../public/uploads/${profile.img_profile}`))
    req.body.img_profile = req.file.filename;
  }
  profile.update({ ...req.body });
  profile.save();
  return res.send(profile);
}

module.exports = {
  get,
  create,
  update,
}
