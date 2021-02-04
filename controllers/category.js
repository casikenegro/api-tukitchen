const models = require('../models');
const func = require('../utils/functions');

function get(req,res){
  const id = req.params.id
  //const id_parent = func.getIdPadre(req.user)

  if(id){
    models.Category.findOne({where: {id} }).then(result => {
      res.json({category: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }else{
    let where = {}
    if(req.user.id_rol !== 2){
      where = {
        [models.Op.or] : [
          {id_parent}, {id_parent: {[models.Op.is] : null}}
        ]
      }
    }
    models.Category.findAll({where}).then(result => {
      res.json({categories: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }
}

async function create(req,res){
  //const id_parent = func.getIdPadre(req.user)
  req.body.id_parent = req.user.id_rol == 1 ? null : id_parent
  models.Category.create(req.body).then(result => {
    res.json({message: "Categoria creada con éxito"})
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })

}

async function update(req,res){
  let id = req.params.id
  models.Category.update(req.body,{where: {id}}).then(result => {
    res.json({message: "Categoria modificada con éxito"})
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })

}

async function destroy(req,res){
  try {
    let id = req.params.id
    await models.Category.destroy({where: {id}})
    res.json({message: "Categoria eliminada con éxito"})
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "No se puede remover la categoria porque tiene registros asociados"})
  }
}

module.exports = {
  get,
  create,
  update,
  destroy,
}
