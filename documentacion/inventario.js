/*
  los campos en el body con el signo de exclamación "!" son requeridos
*/
 {
   GET : {
     url: 'api_direccion/inventary'
     parametros: {},
     respuestas: {
       200: {
          "inventaries": [
              {
                  "id": 5,
                  "stock": 0,
                  "hour_available": "00:00:00",
                  "is_repeat": false,
                  "id_product": 5,
                  "createdAt": "2020-12-11T14:30:24.000Z",
                  "updatedAt": "2020-12-11T14:30:24.000Z",
                  "product": {
                      "id": 5,
                      "name": "carne",
                      "description": "carne podrida",
                      "price": "3000.00",
                      "youtube_link": "",
                      "time_for_preparation": 60,
                      "id_parent": 1,
                      "createdAt": "2020-12-11T14:30:24.000Z",
                      "updatedAt": "2020-12-11T14:30:24.000Z",
                      "gallery": [
                          {
                              "id": 1,
                              "name": "1606404179593-cap1.jpg",
                              "id_product": 4,
                              "createdAt": "2020-11-26T15:22:59.000Z",
                              "updatedAt": "2020-11-26T15:22:59.000Z"
                          },
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
                      ],
                  }
              }
          ]
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   GET : {
     url: 'api_direccion/inventary/:id'
     parametros: {id: "id del inventario a buscar"},
     respuestas: {
       200: {
        "inventary": {
            "id": 5,
            "stock": 0,
            "hour_available": "00:00:00",
            "is_repeat": false,
            "id_product": 5,
            "createdAt": "2020-12-11T14:30:24.000Z",
            "updatedAt": "2020-12-11T14:30:24.000Z",
            "product": {
                "id": 5,
                "name": "carne",
                "description": "carne podrida",
                "price": "3000.00",
                "youtube_link": "",
                "time_for_preparation": 60,
                "id_parent": 1,
                "createdAt": "2020-12-11T14:30:24.000Z",
                "updatedAt": "2020-12-11T14:30:24.000Z",
                "gallery": [
                    {
                        "id": 1,
                        "name": "1606404179593-cap1.jpg",
                        "id_product": 4,
                        "createdAt": "2020-11-26T15:22:59.000Z",
                        "updatedAt": "2020-11-26T15:22:59.000Z"
                    },
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
                ],
            }
          }
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   PUT:{
     url: 'api_direccion/inventary'
     parametros: {id: "id del inventario a modificar"},
     body:{
       stock: number!,
       hour_available: time!,
       is_repeat: boolean,
       id_product: number!
     },
     respuestas: {
       200: {
         message: "Inventario modifcado con éxito"
       },
       422: {
         message: 'Error no se pudo actualizar el inventario, intente de nuevo'
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
 }
