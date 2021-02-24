const { validationResult } = require("express-validator");
const models = require('../models');
const { returnUserByToken } = require("../middleware");
const profile = require("../models/profile");
const { rad } = require("../utils/functions");

const get = async (req,res) => {
    const  user = await returnUserByToken(req);
    const addresses = await models.UserAddress.findAll({where:{ user_id : user.id}});
    return res.status(200).send(addresses);
}
const calculateDistance = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const profile = await models.Profile.findOne({where: {id: req.body.profile_id}});
  if(!profile) return res.status(404).send({message: "profile id not exist"});
  const address = await models.UserAddress.findOne({where:{user_id:profile.user_id}});
  const earthRadio = 6378.137;
  const distanceLatitude = rad(req.body.latitude - address.latitude);
  const distanceLongitude = rad(req.body.longitude - address.longitude);
  const a =  Math.sin(distanceLatitude/2)  * Math.sin(distanceLatitude/2) + 
    Math.sin(distanceLongitude/2) * Math.sin(distanceLongitude/2) * 
    Math.cos(+req.body.latitude)* Math.cos(+address.latitude);
  const c = 2* Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  const d = earthRadio * c;
  return res.status(200).send({distance : d.toFixed(3)});
}
const create = async (req,res) => {
  const errors = validationResult(req);
  const  user = await returnUserByToken(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const address = await models.UserAddress.create({
    ...req.body,
    user_id:user.id
  });
  return res.status(200).send(address);
}

const update =  async (req,res) => {
  const { id } = req.params;
  const address = await models.UserAddress.findOne({where:{ id }});
  if(!address) return res.status(404).send({ message:"bad id" });
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
  calculateDistance
}
