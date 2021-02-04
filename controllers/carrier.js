const models = require('../models');
const func = require('../utils/functions');

function get(req,res){
  const id = req.params.id
  //const id_parent = func.getIdPadre(req.user)

  if(id){
    models.Carrier.findOne({where: {id,id_parent}, include: ['addreses']}).then(result => {
      res.json({transportista: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }else{
    models.Carrier.findAll({where: {id_parent}, include: ['addreses']}).then(result => {
      res.json({transportistas: result})
    }).catch(err => {
     	 console.log(err)
     	 res.status(500).json({message: 'Error, contacte con soporte'})
    })
  }
}

async function create(req,res){
  const id_parent = func.getIdPadre(req.user)
  req.body.id_parent = id_parent
  let addresses = req.body.addresses ? req.body.addresses : []
  if(req.body.addresses) delete req.body.addresses
  const t = await models.sequelize.transaction()
  try {
    let promises = []
    const carrier = await models.Carrier.create(req.body,{transaction: t})
    addresses.forEach((item, i) => {
      promises.push(
        models.CarrierAddress.create({id_carrier : carrier.id,latitude: item.latitude,longitude: item.longitude,address: item.address},{transaction: t})
      )
    });
    await Promise.all(promises)
    await t.commit()
    res.json({message: "Transportista creado con éxito"})
  } catch (e) {
    console.log(e);
    await t.rollback()
    res.status(500).json({message: 'Error, contacte con soporte'})
  }
}

async function update(req,res){
  let id = req.params.id
  const t = await models.sequelize.transaction()
  try {
    let addresses = req.body.addresses ? req.body.addresses : []
    if(req.body.addresses) delete req.body.addresses
    let resultUpdate = await models.Carrier.update(req.body,{where: {id}, transaction : t})
    if(!resultUpdate[0]) return new Error('El registro no pudo actualizarce intente de nuevo')
    await models.CarrierAddress.destroy({where: {id_carrier : id}, transaction: t})
    let promises = []
    addresses.forEach((item, i) => {
      promises.push(
        models.CarrierAddress.create({id_carrier : id,latitude: item.latitude,longitude: item.longitude,address: item.address},{transaction: t})
      )
    });
    await Promise.all(promises)
    await t.commit()
    res.json({message: "Transportista modificado con éxito"})
  } catch (e) {
    console.log(e)
    await t.rollback()
    res.status(500).json({message: 'Error, contacte con soporte'})
  }
}

async function destroy(req,res){
  const t = await models.sequelize.transaction()
  try {
    const id = req.params.id
    await models.CarrierAddress.destroy({ where : {id_carrier : id}, transaction: t })
    await models.Carrier.destroy({ where: {id}, transaction: t })
    await t.commit()
    res.json({message : "transportista eliminado con éxito"})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Error puede que el registro tenga registros asociado y no pueda ser eliminado'})
  }
}

module.exports = {
  get,
  create,
  update,
  destroy
}
