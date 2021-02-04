
/*
  los campos en el body con el signo de exclamación "!" son requeridos;
  la ruta para acceder a las img es {{ruta_api}}/img/profile/{{img_profile}}
*/

{
  GET : {
    descripcion: "endpoint para traer todos los vendedores",
    url: 'api_direccion/user_sellers'
    parametros: {},
    respuestas: {
      200: {
        "sellers": [
          {
              "rut": "12345678",
              "dv": "9",
              "id_rol": 3,
              "id" : 1,
              "id_parent": null,
              "roles": {
                  "id": 1,
                  "name": "Administrador",
                  "createdAt": "2020-11-24T01:41:20.000Z",
                  "updatedAt": "2020-11-24T01:41:20.000Z"
              },
              "profile": {
                "name" : "alvaro",
                "last_name" : "guedez",
                "direccion" : "xxxxdirección",
                "phone" : "03234234xxx",
                "id_user" : "1",
                "name_store" : "",
                "img_profile" : "",
                "name_store": "xxx",
                "img_profile" : "xx.png",
                "api_key" : "xxxx",
                "secret_key" : "xxx",
                "createdAt": "2020-11-24T01:41:20.000Z",
                "updatedAt": "2020-11-24T01:41:20.000Z",
              },
              "addresses" : [
                {"latitude": "122323-11","longitude" : "23234-3--333","address": "dsdfsf","description" : "cualquier descripcion", "city" : "ciudad"}
              ],
          }
        ]
      },
      500: {
        message: 'Error, contacte con soporte'
      },
    }
  },
  GET : {
    "description" : "endpoint para buscar los productos por el id del vendedor",
    "url": 'api_direccion/products_by_seller/:id',
    "parametros": {id: "id del vendedor"},
    "respuestas": {
      200: {
        "product": [{
           "id": 4,
           "name": "carne",
           "description": "",
           "price": "3000.00",
           "youtube_link": "https://www.youtube.com/",
           "time_for_preparation": 20,
           "id_parent": 1,
           "createdAt": "2020-11-26T15:22:59.000Z",
           "updatedAt": "2020-11-26T15:22:59.000Z",
           "is_premium" : 0,
           "gallery": [
               {
                   "id": 1,
                   "name": "1606404179593-cap1.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "1606404179604-node.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 3,
                   "name": "1606404179608-tarjeta coordenadas.png",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "categories": [
               {
                   "id": 1,
                   "name": "prueba",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "prueba1",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "inventary" : {
             "stock" : 1,
             "hour_available" : "13:00",
             "is_repeat": false,
             "id_product" : 4
           },
           "days_available": [
               {
                   "id": 9,
                   "day": "lunes",
                   "id_product": 6,
                   "createdAt": "2020-12-22T20:05:31.000Z",
                   "updatedAt": "2020-12-22T20:05:31.000Z"
               }
           ]
        }]
      },
      500: {
        message: 'Error, contacte con soporte'
      },
    }
  },
  GET : {
    "description" : "endpoint para buscar los productos premium",
    "url": 'api_direccion/products_premium',
    "parametros": {},
    "respuestas": {
      200: {
        "product": [{
           "id": 4,
           "name": "carne",
           "description": "",
           "price": "3000.00",
           "youtube_link": "https://www.youtube.com/",
           "time_for_preparation": 20,
           "id_parent": 1,
           "createdAt": "2020-11-26T15:22:59.000Z",
           "updatedAt": "2020-11-26T15:22:59.000Z",
           "is_premium" : 1,
           "gallery": [
               {
                   "id": 1,
                   "name": "1606404179593-cap1.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "1606404179604-node.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 3,
                   "name": "1606404179608-tarjeta coordenadas.png",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "categories": [
               {
                   "id": 1,
                   "name": "prueba",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "prueba1",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "inventary" : {
             "stock" : 1,
             "hour_available" : "13:00",
             "is_repeat": false,
             "id_product" : 4
           },
           "days_available": [
               {
                   "id": 9,
                   "day": "lunes",
                   "id_product": 6,
                   "createdAt": "2020-12-22T20:05:31.000Z",
                   "updatedAt": "2020-12-22T20:05:31.000Z"
               }
           ]
        }]
      },
      500: {
        message: 'Error, contacte con soporte'
      },
    }
  },
  GET : {
    "description" : "endpoint para buscar los productos por una palabra clave",
    "url": 'api_direccion/products_by_word/:word',
    "parametros": {word : "palabra para buscarla en el nombre o en la descripcion"},
    "respuestas": {
      200: {
        "product": [{
           "id": 4,
           "name": "carne",
           "description": "",
           "price": "3000.00",
           "youtube_link": "https://www.youtube.com/",
           "time_for_preparation": 20,
           "id_parent": 1,
           "createdAt": "2020-11-26T15:22:59.000Z",
           "updatedAt": "2020-11-26T15:22:59.000Z",
           "is_premium" : 1,
           "gallery": [
               {
                   "id": 1,
                   "name": "1606404179593-cap1.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "1606404179604-node.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 3,
                   "name": "1606404179608-tarjeta coordenadas.png",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "categories": [
               {
                   "id": 1,
                   "name": "prueba",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "prueba1",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "inventary" : {
             "stock" : 1,
             "hour_available" : "13:00",
             "is_repeat": false,
             "id_product" : 4
           },
           "days_available": [
               {
                   "id": 9,
                   "day": "lunes",
                   "id_product": 6,
                   "createdAt": "2020-12-22T20:05:31.000Z",
                   "updatedAt": "2020-12-22T20:05:31.000Z"
               }
           ]
        }]
      },
      500: {
        message: 'Error, contacte con soporte'
      },
    }
  },
  GET : {
    "description" : "endpoint para buscar los productos por un categoria",
    "url": 'api_direccion/products_by_category/:id',
    "parametros": {id : "id de la categoria"},
    "respuestas": {
      200: {
        "product": [{
           "id": 4,
           "name": "carne",
           "description": "",
           "price": "3000.00",
           "youtube_link": "https://www.youtube.com/",
           "time_for_preparation": 20,
           "id_parent": 1,
           "createdAt": "2020-11-26T15:22:59.000Z",
           "updatedAt": "2020-11-26T15:22:59.000Z",
           "is_premium" : 1,
           "gallery": [
               {
                   "id": 1,
                   "name": "1606404179593-cap1.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "1606404179604-node.jpg",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 3,
                   "name": "1606404179608-tarjeta coordenadas.png",
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "categories": [
               {
                   "id": 1,
                   "name": "prueba",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               },
               {
                   "id": 2,
                   "name": "prueba1",
                   "category": {
                     "name" : "prueba_categoria",
                     "id_parent": "1",
                     "createdAt": "2020-11-26T15:22:59.000Z",
                     "updatedAt": "2020-11-26T15:22:59.000Z"
                   },
                   "id_product": 4,
                   "createdAt": "2020-11-26T15:22:59.000Z",
                   "updatedAt": "2020-11-26T15:22:59.000Z"
               }
           ],
           "inventary" : {
             "stock" : 1,
             "hour_available" : "13:00",
             "is_repeat": false,
             "id_product" : 4
           },
           "days_available": [
               {
                   "id": 9,
                   "day": "lunes",
                   "id_product": 6,
                   "createdAt": "2020-12-22T20:05:31.000Z",
                   "updatedAt": "2020-12-22T20:05:31.000Z"
               }
           ]
        }]
      },
      500: {
        message: 'Error, contacte con soporte'
      },
    }
  },
}
