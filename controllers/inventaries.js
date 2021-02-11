const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
    const  user = await returnUserByToken(req);
    const {  get_products , page, id} = req.query;
    let include = []
    if(get_products){   
        include.push( {
            model: models.Product,
            as: 'product',
            include : ['gallery']
        })
    }
    let whereInventaries = {}
    if(id) 
        whereInventaries = {...whereInventaries, id }
    const inventaries = await models.Inventaries.paginate({
        where : { ...whereInventaries, user_id: user.id },
        include,
        page : page || 1
    });
    return res.status(200).send(inventaries);
}
const sellInWeek = async (req,res) =>{
    const date = new Date();
    return res.send({ ...date });
}
const create = async (req,res) => {
    const errors = validationResult(req);
    const  user = await returnUserByToken(req);
    if(!errors.isEmpty()){
        return res.status(422).send({ errors: errors.array()})
    }
    const inventary = await models.Inventaries.create({
        ...req.body,
        user_id:user.id
    });
    return res.status(200).send(inventary);
}

const update =  async (req,res) => {
    const { id } = req.params;
    const inventary = await models.Inventaries.findOne({where:{ id }});
    if(!inventary) return res.status(404).send({ message:"bad id" });
    inventary.update({
        ...req.body
    })
    inventary.save()
    return res.status(200).send(inventary);
}

async function destroy(req,res){
    const { id } = req.params;
    await models.Inventary.destroy({where:{ id }});
    return res.status(200).send({ message:"success" });
}


module.exports = {
  get,
  create,
  update,
  destroy,
  sellInWeek
}
