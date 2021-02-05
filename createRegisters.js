var models = require('./models');

exports.createRegisters = () => {
  const pro = new Promise((resolved,rejected) => {
    models.Roles.findAll().then( function(users) {
      if (users) {
        if (users.length == 0){
          let promise = [
            models.Roles.create({id:1,name : 'Administrador'}),
            models.Roles.create({id:2,name : 'Comprador'}),
            models.Roles.create({id:3,name : 'Vendedor'}),
          ]
          Promise.all(promise).then(resultPromise => {
            resolved(true)
          })
        }else{
          resolved(true)
        }
      }
    });
  })
  pro.then(res => {
    return new Promise((resolved,rejected) => {
      models.User.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.User.create({
              id: 1,
              password :'$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda',
              rut: 12,
              dv: 3,
              id_rol: 1,
              id_parent: null,
            }),
          ]
          Promise.all(promise).then(result => {
              resolved(true)
          }).catch(err => {
           	 rejected(err)
          })
        }else{
          resolved(true)
        }
      });
    })
  }).then(res => {
    return new Promise((resolved,rejected) => {
      models.Profile.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Profile.create({
              name: "Darwin",
              last_name: "Ramirez",
              email: "darwinderc92@gmail.com",
              phone: "014123xxxx",
              id_user: 1
            }),
          ]
          Promise.all(promise).then(result => {
              resolved(true)
          }).catch(err => {
           	 rejected(err)
          })
        }else{
          resolved(true)
        }
      });
    })
  }).then(res => {
    return new Promise((resolved,rejected) => {
      models.UserAddress.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.UserAddress.create({
              id_user: 2,
              latitude: "10.165416783055042",
              longitude : '-67.46417228833359',
              address: "cuyagua",
              city: "Caracas",
              description: "jkvgkjswll"
            }),
          ]
          Promise.all(promise).then(result => {
              resolved(true)
          }).catch(err => {
           	 rejected(err)
          })
        }else{
          resolved(true)
        }
      });
    })
  }).then(res => {
    return new Promise((resolved,rejected) => {
      models.Category.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Category.create({
              id_parent: null,
              name: 'categoria 1'
            }),
            models.Category.create({
              id_parent: 3,
              name: 'categoria 2'
            }),
            models.Category.create({
              id_parent: null,
              name: 'categoria 3'
            }),
          ]

          Promise.all(promise).then(result => {
              resolved(true)
          }).catch(err => {
           	 rejected(err)
          })
        }else{
          resolved(true)
        }
      });
    })
  }).then(res => {
    return new Promise((resolved,rejected) => {
      models.ProductDaysAvailable.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.ProductDaysAvailable.create({
              id_product : 1,
              day: "Lunes"
            }),
            models.ProductDaysAvailable.create({
              id_product : 1,
              day: "Martes"
            }),models.ProductDaysAvailable.create({
              id_product : 1,
              day: "Miercoles"
            }),
            models.ProductDaysAvailable.create({
              id_product : 2,
              day: "Jueves"
            }),
            models.ProductDaysAvailable.create({
              id_product : 2,
              day: "Viernes"
            }),
            models.ProductDaysAvailable.create({
              id_product : 3,
              day: "Sabado"
            }),
            models.ProductDaysAvailable.create({
              id_product : 4,
              day: "Domingo"
            }),
          ]

          Promise.all(promise).then(result => {
              resolved(true)
          }).catch(err => {
           	 rejected(err)
          })
        }else{
          resolved(true)
        }
      });
    })
  }).then(res => {
    return new Promise((resolved,rejected) => {
      models.Coupons.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Coupons.create({
              name: "111jkg",
              discount: 10,
              date_expiration: "",
              status: true,
              id_store : 3,
              id_parent: ""
            }),
            models.Coupons.create({
              name: "222mmm",
              discount: 30,
              date_expiration: "",
              status: true,
              id_store : 3,
              id_parent: ""
            }),
          ]
          Promise.all(promise).then(result => {
              resolved(true)
          }).catch(err => {
           	 rejected(err)
          })
        }else{
          resolved(true)
        }
      });
    })
  }).catch(err => {
    console.log(err)
  })
}
