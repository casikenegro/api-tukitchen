/*
  los campos en el body con el signo de exclamación "!" son requeridos
*/

{
  "GET" : {
    "description" : "endpoint para buscar todos los pedidos",
    "url": "api_direccion/payment"
    "parametros": {},
    "respuestas": {
      200 : [{
          "id": 5,
          "id_seller": 5,
          "id_buyer": 5,
          "amount": "3000.00",
          "payment_method": "Flow",
          "number_order": "Macuto-00002",
          "send_address": "Prados de la encrucijada",
          "city": "maracay",
          "value_of_send": "500.00",
          "status": 2,
          "id_carrier": 1,
          "amount_discount_coupons": 0,
          "name_pdf": "hjghfhg.pdf",
          "flow_order_payment": "43021",
          "carrier": {
              "id": 5,
              "name": "alvaro guedez",
              "phone": "0412433737",
              "radio": "5",
              "base_price": "3000.00",
              "extra_price": "1150.20",
              "extra_distance": 100,
              "id_parent": 1,
              "createdAt": "2020-12-17T00:34:44.000Z",
              "updatedAt": "2020-12-17T00:34:44.000Z",
          },
          "updatedAt": "2021-01-07T20:26:59.000Z",
          "createdAt": "2021-01-06T18:55:25.000Z",
          "products": [
              {
                  "id": 9,
                  "id_payment": 5,
                  "name": "mantequilla",
                  "description": "",
                  "price": "1500.00",
                  "time_for_preparation": 60,
                  "is_premium": false,
                  "quantity": 1,
                  "total": "1500.00",
                  "createdAt": "2021-01-06T18:55:25.000Z",
                  "updatedAt": "2021-01-06T18:55:25.000Z"
              },
              {
                  "id": 10,
                  "id_payment": 5,
                  "name": "natilla",
                  "description": "",
                  "price": "1500.00",
                  "time_for_preparation": 60,
                  "is_premium": true,
                  "quantity": 1,
                  "total": "1500.00",
                  "createdAt": "2021-01-06T18:55:25.000Z",
                  "updatedAt": "2021-01-06T18:55:25.000Z"
              }
          ],
          "seller": {
              "id": 5,
              "rut": "11",
              "dv": "1",
              "id_rol": 3,
              "id_parent": null,
              "roles": {
                  "id": 3,
                  "name": "Vendedor",
                  "createdAt": "2020-12-22T19:19:33.000Z",
                  "updatedAt": "2020-12-22T19:19:33.000Z"
              },
              "profile": {
                  "id": 2,
                  "name": "Jessi",
                  "last_name": "Manotas",
                  "name_store": "Macuto",
                  "img_profile": null,
                  "api_key": "",
                  "secret_key": null,
                  "email": "jessica@gmail.com",
                  "phone": "04161080980",
                  "address": null,
                  "id_user": 5,
                  "createdAt": "2021-01-05T18:20:55.000Z",
                  "updatedAt": "2021-01-05T20:08:19.000Z"
              },
              "addresess": []
          },
          "buyer": {
            "id": 5,
            "rut": "11",
            "dv": "1",
            "id_rol": 3,
            "id_parent": null,
              "roles": {
                  "id": 3,
                  "name": "Vendedor",
                  "createdAt": "2020-12-22T19:19:33.000Z",
                  "updatedAt": "2020-12-22T19:19:33.000Z"
              },
              "profile": {
                  "id": 2,
                  "name": "Jessi",
                  "last_name": "Manotas",
                  "name_store": "Macuto",
                  "img_profile": null,
                  "api_key": "",
                  "secret_key": null,
                  "email": "jessica@gmail.com",
                  "phone": "04161080980",
                  "address": null,
                  "id_user": 5,
                  "createdAt": "2021-01-05T18:20:55.000Z",
                  "updatedAt": "2021-01-05T20:08:19.000Z"
              },
              "addresess": []
          }
      }],
      500 : {
        message: "Error, contacte con soporte"
      }
    }
  },
  "GET" : {
    "description" : "endpoint para buscar un pedido especifico",
    "url": "api_direccion/payment/:id"
    "parametros": {"id" : "id del pago a buscar"},
    "respuestas": {
      200 : {
          "id": 5,
          "id_seller": 5,
          "id_buyer": 5,
          "amount": "3000.00",
          "payment_method": "Flow",
          "number_order": "Macuto-00002",
          "send_address": "Prados de la encrucijada",
          "city": "maracay",
          "value_of_send": "500.00",
          "status": 2,"id_carrier": 1,
          "amount_discount_coupons": 0,
          "name_pdf": "hjghfhg.pdf",
          "flow_order_payment": "43021",
          "carrier": {
              "id": 5,
              "name": "alvaro guedez",
              "phone": "0412433737",
              "radio": "5",
              "base_price": "3000.00",
              "extra_price": "1150.20",
              "extra_distance": 100,
              "id_parent": 1,
              "createdAt": "2020-12-17T00:34:44.000Z",
              "updatedAt": "2020-12-17T00:34:44.000Z",
          },
          "createdAt": "2021-01-06T18:55:25.000Z",
          "updatedAt": "2021-01-07T20:26:59.000Z",
          "products": [
              {
                  "id": 9,
                  "id_payment": 5,
                  "name": "mantequilla",
                  "description": "",
                  "price": "1500.00",
                  "time_for_preparation": 60,
                  "is_premium": false,
                  "quantity": 1,
                  "total": "1500.00",
                  "createdAt": "2021-01-06T18:55:25.000Z",
                  "updatedAt": "2021-01-06T18:55:25.000Z"
              },
              {
                  "id": 10,
                  "id_payment": 5,
                  "name": "natilla",
                  "description": "",
                  "price": "1500.00",
                  "time_for_preparation": 60,
                  "is_premium": true,
                  "quantity": 1,
                  "total": "1500.00",
                  "createdAt": "2021-01-06T18:55:25.000Z",
                  "updatedAt": "2021-01-06T18:55:25.000Z"
              }
          ],
          "seller": {
            "id": 5,
            "rut": "11",
            "dv": "1",
            "id_rol": 3,
            "id_parent": null,
              "roles": {
                  "id": 3,
                  "name": "Vendedor",
                  "createdAt": "2020-12-22T19:19:33.000Z",
                  "updatedAt": "2020-12-22T19:19:33.000Z"
              },
              "profile": {
                  "id": 2,
                  "name": "Jessi",
                  "last_name": "Manotas",
                  "name_store": "Macuto",
                  "img_profile": null,
                  "api_key": "",
                  "secret_key": null,
                  "email": "jessica@gmail.com",
                  "phone": "04161080980",
                  "address": null,
                  "id_user": 5,
                  "createdAt": "2021-01-05T18:20:55.000Z",
                  "updatedAt": "2021-01-05T20:08:19.000Z"
              },
              "addresess": []
          },
          "buyer": {
            "id": 5,
            "rut": "11",
            "dv": "1",
            "id_rol": 3,
            "id_parent": null,
              "roles": {
                  "id": 3,
                  "name": "Vendedor",
                  "createdAt": "2020-12-22T19:19:33.000Z",
                  "updatedAt": "2020-12-22T19:19:33.000Z"
              },
              "profile": {
                  "id": 2,
                  "name": "Jessi",
                  "last_name": "Manotas",
                  "name_store": "Macuto",
                  "img_profile": null,
                  "api_key": "",
                  "secret_key": null,
                  "email": "jessica@gmail.com",
                  "phone": "04161080980",
                  "address": null,
                  "id_user": 5,
                  "createdAt": "2021-01-05T18:20:55.000Z",
                  "updatedAt": "2021-01-05T20:08:19.000Z"
              },
              "addresess": []
          }
      },
      500 : {
        message: "Error, contacte con soporte"
      }
    }
  },
  "GET" : {
    "description" : "endpoint para buscar pedidos por un status",
    "url": "api_direccion/payment_by_status/:status"
    "parametros": {"status" : "1) pendientes, 2) pagados, 3) anulados"},
    "respuestas": {
      200 : [{
          "id": 5,
          "id_seller": 5,
          "id_buyer": 5,
          "amount": "3000.00",
          "payment_method": "Flow",
          "number_order": "Macuto-00002",
          "send_address": "Prados de la encrucijada",
          "city": "maracay",
          "value_of_send": "500.00",
          "status": 2,
          "id_carrier": 1,
          "amount_discount_coupons": 0,
          "name_pdf": "hjghfhg.pdf",
          "flow_order_payment": "43021",
          "carrier": {
              "id": 5,
              "name": "alvaro guedez",
              "phone": "0412433737",
              "radio": "5",
              "base_price": "3000.00",
              "extra_price": "1150.20",
              "extra_distance": 100,
              "id_parent": 1,
              "createdAt": "2020-12-17T00:34:44.000Z",
              "updatedAt": "2020-12-17T00:34:44.000Z",
          },
          "createdAt": "2021-01-06T18:55:25.000Z",
          "updatedAt": "2021-01-07T20:26:59.000Z",
          "products": [
              {
                  "id": 9,
                  "id_payment": 5,
                  "name": "mantequilla",
                  "description": "",
                  "price": "1500.00",
                  "time_for_preparation": 60,
                  "is_premium": false,
                  "quantity": 1,
                  "total": "1500.00",
                  "createdAt": "2021-01-06T18:55:25.000Z",
                  "updatedAt": "2021-01-06T18:55:25.000Z"
              },
              {
                  "id": 10,
                  "id_payment": 5,
                  "name": "natilla",
                  "description": "",
                  "price": "1500.00",
                  "time_for_preparation": 60,
                  "is_premium": true,
                  "quantity": 1,
                  "total": "1500.00",
                  "createdAt": "2021-01-06T18:55:25.000Z",
                  "updatedAt": "2021-01-06T18:55:25.000Z"
              }
          ],
          "seller": {
            "id": 5,
            "rut": "11",
            "dv": "1",
            "id_rol": 3,
            "id_parent": null,
              "roles": {
                  "id": 3,
                  "name": "Vendedor",
                  "createdAt": "2020-12-22T19:19:33.000Z",
                  "updatedAt": "2020-12-22T19:19:33.000Z"
              },
              "profile": {
                  "id": 2,
                  "name": "Jessi",
                  "last_name": "Manotas",
                  "name_store": "Macuto",
                  "img_profile": null,
                  "api_key": "",
                  "secret_key": null,
                  "email": "jessica@gmail.com",
                  "phone": "04161080980",
                  "address": null,
                  "id_user": 5,
                  "createdAt": "2021-01-05T18:20:55.000Z",
                  "updatedAt": "2021-01-05T20:08:19.000Z"
              },
              "addresess": []
          },
          "buyer": {
            "id": 5,
            "rut": "11",
            "dv": "1",
            "id_rol": 3,
            "id_parent": null,
              "roles": {
                  "id": 3,
                  "name": "Vendedor",
                  "createdAt": "2020-12-22T19:19:33.000Z",
                  "updatedAt": "2020-12-22T19:19:33.000Z"
              },
              "profile": {
                  "id": 2,
                  "name": "Jessi",
                  "last_name": "Manotas",
                  "name_store": "Macuto",
                  "img_profile": null,
                  "api_key": "",
                  "secret_key": null,
                  "email": "jessica@gmail.com",
                  "phone": "04161080980",
                  "address": null,
                  "id_user": 5,
                  "createdAt": "2021-01-05T18:20:55.000Z",
                  "updatedAt": "2021-01-05T20:08:19.000Z"
              },
              "addresess": []
          }
      }],
      "500" : {
        "message": "Error, contacte con soporte"
      }
    }
  },
  "POST": {
    "description" : "endpoint para crear un pedido",
    "url": "api_direccion/payment"
    "parametros": {},
    "body" : {
      "id_seller" : "number"!,
      "amount": "number"!,
      "id_address": "number"!,
      "value_of_send": "number"!,
      "id_carrier" : "number"!,
      "amount_discount_coupons" : "number",
      "products" : [{
        "id_product": "number"!,
        "name": "string"!,
        "description": "string",
        "price": "number"!,
        "time_for_preparation": "number"!,
        "is_premium": BOOLEAN!,
        "quantity": "number"!
      }]
    },
    "respuestas": {
      "200": {
        "payment": {
          "status": 1,
          "id": 6,
          "id_seller": 5,
          "id_buyer": 5,
          "amount": 3000,
          "payment_method": "Flow",
          "number_order": "Macuto-00003",
          "send_address": "Prados de la encrucijada",
          "city": "maracay",
          "value_of_send": 500,
          "updatedAt": "2021-01-06T20:16:24.907Z",
          "createdAt": "2021-01-06T20:16:24.907Z"
        },
        "flowResponse": {}, // en caso que la tienda este asociada a la pasarela de pago devuelve este objeto lleno
        "flowResponse": {
          "token": "62CE3E6FEB8E859727F2CACA4ED19538D62AD2DR", //para redireccionar al cliente se debe contatenar la url con el token
          "url": "https://sandbox.flow.cl/app/web/pay.php", // asi: url = url+"?token="+token
          "flowOrder": 407952
        },
        "flow": false // en caso que la tienda este asociada a la pasarela de pago devuelve true
      },
      "500" : {
        "message" : "Error, contacte con soporte"
      }
    }
  },
  "PUT": {
    "description" : "endpoint para cambiar el  status a un pedido",
    "url": "api_direccion/payment_change_status/:id"
    "parametros": {"id" : "id del pago a modificar"},
    "body" : {
      "status" : "number"!,
    },
    "respuestas": {
      "200": {},
      },
      "422":{
        "message" : "Error, no se pudo actualizar el registro intente de nuevo"
      },
      "500" : {
        "message" : "Error, contacte con soporte"
      }
    }
  },
}
