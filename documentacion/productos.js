/*
  los campos en el body con el signo de exclamación "!" son requeridos
*/
 {
   GET : {
     "description" : "endpoint para buscar todos los productos",
     url: 'api_direccion/product'
     parametros: {},
     respuestas: {
       200: {
         "products": [{
            "id": 4,
            "name": "carne",
            "description": "",
            "price": "3000.00",
            "youtube_link": "https://www.youtube.com/",
            "time_for_preparation": 20,
            "id_parent": 1,
            "status" : 1,
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
                    "id_category": "1",
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
                    "id_category": "2",
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
     "description" : "endpoint para buscar un producto en especifico los productos",
     "url": 'api_direccion/product/:id',
     "parametros": {id: "id del producto a buscar"},
     "respuestas": {
       200: {
         "product": {
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
            "status" : 1,
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
         }
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   GET: {
     "description" : "endpoint para buscar los productos por paginación para el comprador",
     "url": 'api_direccion/product_by_pagination/:offset/:limit?'
     parametros: {
       "offset": "es el parametro del número de la paginación y es requerido",
       "limit" : "es el parametro de cuantos registros traer por busqueda, no  es requerido y es 10 por default"
     },
     "response" : {
       200: {
         "products": [
            {
                "id": 11,
                "name": "moto",
                "description": "description",
                "price": "3000.00",
                "youtube_link": "",
                "time_for_preparation": 120,
                "id_parent": 1,
                "createdAt": "2020-11-27T02:02:06.000Z",
                "updatedAt": "2020-11-27T02:02:06.000Z",
                "gallery": [],
                "status" : 1,
                "categories": [
                    {
                        "id": 4,
                        "id_category": 2,
                        "id_product": 11,
                        "createdAt": "2020-11-27T02:02:06.000Z",
                        "updatedAt": "2020-11-27T02:02:06.000Z",
                        "category": {
                            "id": 2,
                            "name": "prueba2",
                            "id_parent": 1,
                            "createdAt": "2020-11-26T20:33:13.000Z",
                            "updatedAt": "2020-11-26T20:33:13.000Z"
                        }
                    }
                ],
                "inventary": {
                    "id": 4,
                    "stock": 0,
                    "day_adviable": "",
                    "hour_available": "00:00:00",
                    "is_repeat": false,
                    "id_product": 11,
                    "createdAt": "2020-11-27T02:02:06.000Z",
                    "updatedAt": "2020-11-27T02:02:06.000Z"
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
            },
            {
                "id": 4,
                "name": "carne",
                "description": "",
                "price": "3000.00",
                "youtube_link": "https://www.youtube.com/",
                "time_for_preparation": 20,
                "id_parent": 1,
                "createdAt": "2020-11-26T15:22:59.000Z",
                "updatedAt": "2020-11-26T15:22:59.000Z",
                "gallery": [],
                "categories": [],
                "inventary": {
                    "id": 4,
                    "stock": 0,
                    "day_adviable": "",
                    "hour_available": "00:00:00",
                    "is_repeat": false,
                    "id_product": 11,
                    "createdAt": "2020-11-27T02:02:06.000Z",
                    "updatedAt": "2020-11-27T02:02:06.000Z"
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
            }
         ]
       },
       422: {
         message: "Error, el parametro de paginación es quererido"
       },
       500: {
         message: 'Error, contacte con soporte'
       }
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
            "status" : 1,
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
            "status" : 1,
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
            "status" : 1,
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
            "is_premium" : 1,"status" : 1,
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
   POST:{
     url: 'api_direccion/product'
     parametros: {},
     body:{
       name: string!,
       description: string,
       price: number!,
       youtube_link: string,
       time_for_preparation: number!,
       categories: [1,2,3,4,5,6,7]!, //arreglo con el id de las categorias,
       days: []! //lunes,martes,miercoles, etc...
       gallery : (array of files),
       is_premium : BOOLEAN, // default false
     },
     respuestas: {
       200: {
        "products": [{
            "id": 4,
            "name": "carne",
            "description": "",
            "price": "3000.00",
            "youtube_link": "https://www.youtube.com/",
            "time_for_preparation": 20,
            "id_parent": 1,
            "createdAt": "2020-11-26T15:22:59.000Z",
            "updatedAt": "2020-11-26T15:22:59.000Z",
            "status" : 1,
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
                    "id_category": "1",
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
                    "id_category": "2",
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
   POST:{
     url: 'api_direccion/product_by_filter'
     parametros: {},
     body:{
       id_category: number,
       stock : number,
       lower_price: number,
       max_price : number,
       day_available: string, //Lunes, Martes, Miercoles, etc...
       hour_available: string,
       is_premium : BOOLEAN, // default false
     },
     respuestas: {
       200: {
         "products": [{
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
            "status" : 1,
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
                    "id_category": "1",
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
                    "id_category": "2",
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
   PUT:{
     url: 'api_direccion/product/:id'
     parametros: {id : "id del producto a modificar"},
     body:{
       name: string!,
       description: string,
       price: number!,
       youtube_link: string,
       time_for_preparation: number!,
       categories: [1,2,3,4,6,7],  //arreglo con el id de las categorias,
       days: []!,
       gallery : (array of files),
       is_premium : BOOLEAN,
     },
     respuestas: {
       200: {
         message : "producto modificado con éxito"
       },
       422:{
         message: "El producto no ha podido ser modificado con éxito, de persistir este error contacte con soporte"
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   PUT:{
     description: "endpoint para colocar un producto en premium o quitarlo",
     url: 'api_direccion/product_change_status/:id',
     parametros: {id : "id del producto a modificar"},
     body:{
       is_premium : BOOLEAN!,
     },
     respuestas: {
       200: {
         message : "producto modificado con éxito"
       },
       422:{
         message: "El producto no ha podido ser modificado con éxito, de persistir este error contacte con soporte"
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   DELETE:{
     url : 'api_direccion/product/:id',
     parametros: {id: "id del producto a eliminar"},
     respuestas: {
       200: {message: "Producto eliminado con éxito"},
       500: {message: "Error, contacte con soporte"}
     }
   },
   DELETE:{
     url : 'api_direccion/product_remove_img/:id/:filename',
     parametros: {id: "id de la imagen a eliminar", filename: "nombre de la imagen a eliminar"},
     respuestas: {
       200: {message: "Imagen eliminada con éxito"},
       500: {message: "Error, contacte con soporte"}
     }
   },
 }
