const models = require('../models');
const func = require('../utils/functions');

function get(req,res){
  const id_product = req.params.id
  //const id_parent = func.getIdPadre(req.user)
  if(id_product){
    models.Inventary.findOne({where: {id_product},
      include: [{
        model: models.Product,
        as: 'product',
        include: ['gallery',{
          model: models.ProductCategories,
          as: 'categories',
          required: false,
          include : ['category']
        }],
        where: {id_parent}
      }]
    }).then(result => {
      res.json({inventary: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }else{
    models.Inventary.findAll({
      include : [{
        model: models.Product,
        as: 'product',
        where: {id_parent},
        include: ['gallery',{
          model: models.ProductCategories,
          as: 'categories',
          required: false,
          include : ['category']
        }],
      }]
    }).then(result => {
      res.json({inventaries: result})
    }).catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }
}

function update(req,res){
  const id = req.params.id
  models.Inventary.update(req.body,{where: {id}}).then(result => {
    if(result[0]){
      res.json({message: "Inventario modificado con éxito"})
    }else{
      res.status(422).json({message: 'Error no se pudo actualizar el inventario, intente de nuevo'})
    }
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })
}

module.exports = {
  get,
  update
}
