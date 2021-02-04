const models = require('../models');

async function get(req,res){
  const id = req.params.id
  if(id){
    models.Roles.findOne({where: {id}}).then(result => {
      res.json({roles : result})
    }).catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error,contacte con soporte'})
    })
  }else{
    models.Roles.findAll().then(result => {
      res.json(result)
    }).catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error,contacte con soporte'})
    })
  }
}

module.exports = {
  get
}
