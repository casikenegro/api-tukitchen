const { validationResult } = require("express-validator");
const models = require('../models');
const { returnUserByToken } = require("../middleware");
const { returnProfile,insertHours } = require("../utils/functions")

const get = async (req,res) => {
    try {
        const  profile = await returnProfile(req);
        const {  get_products , page, id} = req.query;
        let include = []
        if(get_products){   
            include.push( {
                model: models.Product,
                as: 'product',
                include : ['gallery']
            })
        }
        let whereInventories = {}
        if(id) 
            whereInventories = {...whereInventories, id }
        const inventories = await models.Inventories.paginate({
            where : { ...whereInventories, profile_id: profile.id },
            include,
            page : page || 1
        });
        return res.status(200).send(inventories);
    } catch (error) {
        return res.status(500).send(error);
    }
}


const create = async (req,res) => {
    try {
        const errors = validationResult(req);
        const  user = await returnUserByToken(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array()})
        }
        const inventory = await models.Inventories.create({
            ...req.body,
            user_id:user.id
        });
        return res.status(200).send(inventory);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const test = async (req,res) => {
        const hours = await insertHours("00:19","23:59",1);
        return res.status(200).send(hours);
}

const update =  async (req,res) => {
    try {
        const { id } = req.params;
        const inventory = await models.Inventories.findOne({where:{ id }});
        if(!inventory) return res.status(404).send({ message:"bad id" });
        inventory.update({
            ...req.body
        })
        inventory.save()
        return res.status(200).send(inventory);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function destroy(req,res){
    try {
        const { id } = req.params;
        await models.Inventory.destroy({where:{ id }});
        return res.status(200).send({ message:"success" });
    } catch (error) {
        return res.status(500).send(error);
    }
}


module.exports = {
  get,
  create,
  update,
  destroy,
  test
}
