const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  const  user = await returnUserByToken(req);
  if(req.query.id){
    const carrier = await models.Carrier.findOne({
      where:{ user_id : user.id, id}, 
      include: ["carrier_addresses"]
    });
    return res.status(200).send(carrier);
  }
  const carriers = await models.Carrier.findAll({
    where:{ user_id : user.id }, 
    include: ["carrier_addresses"]
  });
  return res.status(200).send(carriers);
}
const create = async (req,res) => {
  const errors = validationResult(req);
  const  user = await returnUserByToken(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const carrier = await models.Carrier.create({
    ...req.body,
    user_id:user.id
  });
  return res.status(200).send(carrier);
}

const update =  async (req,res) => {
  const { id } = req.params;
  const carrier = await models.Carrier.findOne({where:{ id }});
  if(!carrier) return res.status(404).send({ message:"bad id" });
  carrier.update({
      ...req.body
  })
  carrier.save()
  return res.status(200).send(carrier);
}

async function destroy(req,res){
  const { id } = req.params;
  await models.Carrier.delete({where:{ id }});
  return res.status(200).send({ message:"success" });
}


module.exports = {
  get,
  create,
  update,
  destroy,
}
