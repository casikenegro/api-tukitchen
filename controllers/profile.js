const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
const emailValidator = require('email-validator');

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const attributes = [ 
    "id", "name",
    "last_name", "name_store",
    "img_profile","api_key",
    "secret_key","email",
    "phone","address"
  ];

const get = async (req,res) => {
  const { id } = await returnUserByToken(req);
  const profile = await models.Profile.findOne({where: {user_id : id}});
  if(!profile) return res.status(404).send({message:"profile not exist"});
  return res.send(profile);
}

const getAll = async (req,res) => {
  let where = {};
  if(req.query.id) where = { ...where, id: req.query.id }
  const profiles = await models.Profile.paginate({where,attributes});
  return res.send(profiles);
}

const create = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  if(req.body.email){
    if(!emailValidator.validate(req.body.email)){
      fs.unlinkSync(path.join(__dirname,`../public/uploads/${req.file.filename}`))
      return res.status(422).json({message: "El email proporcionado no posee formato de correo valido"})
    }
  }
  const user = await returnUserByToken(req);
  let profile = await models.Profile.findOne({where: {user_id : id}});
  if(user.role !== "COMPRADOR"){
    if(!req.file) res.status(400).send({message:"image is required"}); 
  }
  if(!profile){
    let profile = await models.Profile.create({
      ...req.body,
      img_profile: req.file.filename,
      user_id: user.id,
    });
    return res.send(profile);
  }
  fs.unlinkSync(path.join(__dirname,`../public/uploads/${req.file.filename}`))
  res.status(400).send({message:"profile exist"});

}

async function update(req,res){
  if(req.body.email){
    if(!emailValidator.validate(req.body.email)){
      res.status(422).json({message: "El email proporcionado no posee formato de correo valido"})
      return
    }
  }
  const { id } = await returnUserByToken(req);
  let profile = await models.Profile.findOne({ where: { user_id: id } });
  if(!profile)  return res.status(404).send({message: "profile not exist"});

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
  getAll,
  create,
  update,
}
