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
            models.User.create({
              id: 2,
              password :'$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda',
              rut: 34,
              dv: 5,
              id_rol: 2,
              id_parent: null,
            }),
            models.User.create({
              id: 3,
              password :'$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda',
              rut: 56,
              dv: 7,
              id_rol: 3,
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
            models.Profile.create({
              name: "Alvaro",
              last_name: "Guedez",
              email: "alvaro.develoop@gmail.com",
              phone: "014123xxxx",
              id_user: 2
            }),
            models.Profile.create({
              name: "Matt",
              last_name: "Desarrollador",
              email: "desarrollador@gmail.com",
              phone: "014123xxxx",
              name_store: 'Macuto',
              api_key: '58929F9A-770E-4ED0-9134-52E11LCBD727',
              secret_key: '9f4a8fbc04a6cb3c5fe1875da3d89ee0e057b74e',
              address: 'Caracas',
              id_user: 3
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
            models.UserAddress.create({
              id_user: 2,
              latitude: "10.188835208430982",
              longitude : '-67.47476377353426',
              address: "Valencia",
              city: "Cagua",
              description: "Huete"
            }),
            models.UserAddress.create({
              id_user: 3,
              latitude: "10.207931684045546",
              longitude : '-67.47126132717695',
              address: "Anzoategui",
              city: "Vargas",
              description: "Catialamar"
            }),
            models.UserAddress.create({
              id_user: 3,
              latitude: "10.21491386215283",
              longitude : '-67.42329325574691',
              address: "Bolivar",
              city: "Trujillo",
              description: "San Antonio"
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
      models.Carrier.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Carrier.create({
              phone: "0114144",
              name: 'Andres Aguilar',
              radio: '5',
              base_price: 3000,
              extra_price: 500,
              extra_distance: 200,
              id_parent : 3
            }),
            models.Carrier.create({
              phone: "022255",
              name: 'Miguel Campos',
              radio: 10,
              base_price: 4000,
              extra_price: 100,
              extra_distance: 700,
              id_parent : 3
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
      models.CarrierAddress.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.CarrierAddress.create({
              id_carrier: 1,
              latitude: "10.184199421087499",
              longitude : '-67.4490794516644',
              address: "Macaracuay",
            }),
            models.CarrierAddress.create({
              id_carrier: 1,
              latitude: "10.169245728792802",
              longitude : '-67.44032459642179',
              address: "Segundera",
            }),
            models.CarrierAddress.create({
              id_carrier: 2,
              latitude: "10.154499199974202",
              longitude : '-67.42792568983599',
              address: "los tanque la villa",
            }),
            models.CarrierAddress.create({
              id_carrier: 2,
              latitude: "10.219519744681671",
              longitude : '-67.39334458635439',
              address: "Gamarra",
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
      models.Product.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Product.create({
              name: "matequilla",
              description: "baja en calorias",
              price: 3000,
              youtube_link: "",
              time_for_preparation: 60,
              is_premium : false,
              status : 1,
              id_parent: 3
            }),
            models.Product.create({
              name: "Natilla",
              description: "queso cabra",
              price: 12000,
              youtube_link: "",
              time_for_preparation: 30,
              is_premium : true,
              status : 1,
              id_parent: 3
            }),
            models.Product.create({
              name: "mostaza",
              description: "amarillo",
              price: 5000,
              youtube_link: "",
              time_for_preparation: 80,
              is_premium : false,
              status : 1,
              id_parent: 3
            }),
            models.Product.create({
              name: "Chocofresa",
              description: "anemia",
              price: 8000,
              youtube_link: "",
              time_for_preparation: 50,
              is_premium : true,
              status : 1,
              id_parent: 3
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
      models.ProductCategories.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.ProductCategories.create({
              id_category: 1,
              id_product: 1
            }),
            models.ProductCategories.create({
              id_category: 2,
              id_product: 2
            }),
            models.ProductCategories.create({
              id_category: 1,
              id_product: 3
            }),
            models.ProductCategories.create({
              id_category: 2,
              id_product: 4
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
      models.Inventary.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Inventary.create({
              stock: 30,
              hour_available: "19:00",
              is_repeat: true,
              id_product: 1
            }),
            models.Inventary.create({
              stock: 80,
              hour_available: "08:00",
              is_repeat: false,
              id_product: 2
            }),models.Inventary.create({
              stock: 10,
              hour_available: "22:00",
              is_repeat: true,
              id_product: 3
            }),
            models.Inventary.create({
              stock: 300,
              hour_available: "06:00",
              is_repeat: false,
              id_product: 4
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
  }).then(res => {
    return new Promise((resolved,rejected) => {
      models.Payment.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.Payment.create({
              id_seller:3,
              id_buyer: 2,
              amount: 3000,
              payment_method : "Fisico",
              number_order: "00001",
              send_address: "jhkjhkjhjk",
              city: "Caracas",
              value_of_send: 300,
              status: 1,
              id_carrier: 1,
              amount_discount_coupons: "",
              flow_order_payment: "",
            }),
            models.Payment.create({
              id_seller:3,
              id_buyer: 2,
              amount: 5000,
              payment_method : "Fisico",
              number_order: "00002",
              send_address: "nkjnkjn",
              city: "Valencia",
              value_of_send: 500,
              status: 1,
              id_carrier: 1,
              amount_discount_coupons: "",
              flow_order_payment: "",
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
      models.PaymentProducts.findAll().then( function(users) {
        if (users.length == 0){
          let promise = [
            models.PaymentProducts.create({
              id_payment: 1,
              name: "Mantequilla",
              description: "amarillo",
              price: 3000,
              time_for_preparation: 60,
              is_premium : true,
              quantity : 1,
              total : 3000,
            }),
            models.PaymentProducts.create({
              id_payment: 2,
              name: "Natilla",
              description: "cualquiera",
              price: 5000,
              time_for_preparation: 80,
              is_premium : false,
              quantity : 1,
              total : 5000
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
