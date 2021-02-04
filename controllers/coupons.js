const models = require('../models');
const func = require('../utils/functions');
const fields = require('../utils/fields');

function get(req,res){
  const id = req.params.id
  if(id){
    models.Coupons.findOne({where: {id},include: [{
      model : models.User,
      as : 'store',
      attributes: fields.userFields,
      include: ['profile']
    }]}).then(result => {
      res.json({coupon: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }else{
    let where = {id_parent : req.user.id_rol === 1 ? {[models.Op.is] : null} : func.getIdPadre(req.user)}
    models.Coupons.findAll({where, include: [{
      model : models.User,
      as : 'store',
      attributes: fields.userFields,
      include: ['profile']
    }]}).then(result => {
      res.json({coupons: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }
}

async function create(req,res){
  if(req.body.name.length !== 6){
    res.status(422).json({message: 'El código del cupon debe contener 6 caracteres'})
    return
  }

  models.Coupons.findOrCreate({where: {name : req.body.name}, defaults:req.body }).then(result => {
    if(result[1]){
      res.json({message: "Cupon creado con éxito"})
    }else{
      res.status(422).json({message: 'Cupon repetido intente con otro código'})
    }
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })

}

async function update(req,res){
  let id = req.params.id
  models.Coupons.update(req.body,{where: {id}}).then(result => {
    res.json({message: "Cupon modificado con éxito"})
  }).catch(err => {
   	 console.log(err)
   	 res.status(500).json({message: 'Error, contacte con soporte'})
  })

}

async function destroy(req,res){
  try {
    let id = req.params.id
    await models.Coupons.destroy({where: {id}})
    res.json({message: "Cupon eliminado con éxito"})
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "No se puede remover el cupon porque tiene registros asociados"})
  }
}

async function verifyToken(req,res){
  const code = req.params.code
  let isActive = await models.Coupons.findOne({where : {name : code, status: true}})
  if(isActive){
    res.json({code})
  }else{
    res.status(422).json({message: "El cupon no se encuentra activo"})
  }
}

module.exports = {
  get,
  create,
  update,
  destroy,
  verifyToken
}
