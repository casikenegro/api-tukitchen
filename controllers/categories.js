const { validationResult } = require("express-validator");

const models = require('../models');
const { returnUserByToken } = require("../middleware");

const get = async (req,res) => {
  const {  user_id, word, get_products , page, id} = req.query;
  let include = []
  if(get_products){
    include.push( {
      model: models.ProductCategories,
      as:"categories_products",
      include: ["product"]
    } )
  }
  let whereCategories = {}
  if(id) whereCategories = {...whereCategories, id }
  if(user_id) whereCategories = {...whereCategories, user_id }
  if(word) whereCategories = {
    ...whereCategories,
    [models.Op.or] : [
      {name : {[models.Op.substring] : word} }, {name : {[models.Op.substring] : word} }
    ],
  }

  const categories = await models.Categories.paginate({
      where : { ...whereCategories },
      include,
      page : page || 1
  });
  return res.status(200).send(categories);
}

const create = async (req,res) => {
  const errors = validationResult(req);
  const  user = await returnUserByToken(req);
  if(!errors.isEmpty()){
    return res.status(422).send({ errors: errors.array()})
  }
  const category = await models.Categories.create({
    ...req.body,
    user_id:user.id
  });
  return res.status(200).send(category);
}

const update =  async (req,res) => {
  const { id } = req.params;
  const category = await models.Categories.findOne({where:{ id }});
  if(!category) return res.status(404).send({ message:"bad id" });
  category.update({
      ...req.body
  })
  category.save()
  return res.status(200).send(category);
}

async function destroy(req,res){
  const { id } = req.params;
  await models.Categories.destroy({where:{ id }});
  return res.status(200).send({ message:"success" });
}


module.exports = {
  get,
  create,
  update,
  destroy,
}
