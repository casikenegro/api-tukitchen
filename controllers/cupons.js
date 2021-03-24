const { validationResult } = require("express-validator");
const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  try {
    const { page, id, is_used} = req.query;
    let whereCupons = {}
    const user = await returnUserByToken(req);
    const profile = await models.Profile.findOne({where: {user_id: user.id}});
    if(!profile) return res.status(403).send({message:"profile not create"});
    if(id) 
        whereCupons = {...whereCupons, id }
    if(is_used)
      whereCupons = {...whereCupons, is_used }
    const cupons = await models.Cupons.paginate({
        where : { ...whereCupons },
        page : page || 1
    });
    return res.status(200).send(cupons);
  } catch (error) {
    return res.status(500).send(error); 
  }
}
const isCouponValid = async (req,res) =>{
  try {
    const { name } = req.query;
    const cupon = await models.Cupons.findOne({ where: {  name }});
    if(!cupon.is_used) return res.status(200).send({});
    return res.send(cupon);    
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function create(req,res){
  try {
    const errors = validationResult(req);
    const  user = await returnUserByToken(req);
    if(!errors.isEmpty()){
      return res.status(422).send({ errors: errors.array()})
    }
    const profile = await models.Profile.findOne({where: {user_id: user.id }});
    if(!profile) return res.status(403).send({message:"profile not create"});
    const cupon = await models.Cupons.create({
      discount:req.body.discount /100,
      profile_id: profile.id, 
      is_used:false,
    });
    return res.status(200).send(cupon);
  } catch (error) {
    return res.status(500).send(error);    
  }  
}

async function createByAdmin(req,res){
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).send({ errors: errors.array()})
    }
    const profile = await models.Profile.findOne({where: {user_id: req.params.user_id}});
    if(!profile) return res.status(403).send({message:"profile not create"});
    const cupon = await models.Cupons.create({
      discount:req.body.discount /100,
      profile_id: profile.id, 
      is_used:false,
    });
    return res.status(200).send(cupon);  
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function update(req,res){
  try {
    let cupon = await models.Cupons.findOne({ where: { id: req.params.id } });
    if(!cupon) return res.status(400).send({message:"bad request"});
    cupon.update({ ...req.body });
    cupon.save();
    return res.send(cupon);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function destroy(req,res){
  try {
    await models.Cupons.destroy({ where: { id: req.params.id } });
    return res.send({message:"success"});
  } catch (error) {
   return res.status(500).send({message: "oh no, bad request"}); 
  }
}

module.exports = {
  get,
  create,
  createByAdmin,
  update,
  destroy,
  isCouponValid
}