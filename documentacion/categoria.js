/*
  los campos en el body con el signo de exclamación "!" son requeridos
*/
 {
   GET : {
     url: 'api_direccion/category'
     parametros: {},
     respuestas: {
       200: {
          "categories": [
              {
                  "id": 1,
                  "name": "prueba1",
                  "id_parent": 1,
                  "createdAt": "2020-11-26T20:33:10.000Z",
                  "updatedAt": "2020-11-26T20:33:10.000Z"
              },
              {
                  "id": 2,
                  "name": "prueba2",
                  "id_parent": 1,
                  "createdAt": "2020-11-26T20:33:13.000Z",
                  "updatedAt": "2020-11-26T20:33:13.000Z"
              }
          ]
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   GET : {
     url: 'api_direccion/category/:id'
     parametros: {id: "id de la categoria a buscar"},
     respuestas: {
       200: {
        "category": {
             "id": 1,
             "name": "prueba1",
             "id_parent": 1,
             "createdAt": "2020-11-26T20:33:10.000Z",
             "updatedAt": "2020-11-26T20:33:10.000Z"
         },
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   POST:{
     url: 'api_direccion/category'
     parametros: {},
     body:{
       name: string!,
     },
     respuestas: {
       200: {
         message: "Categoria creada con éxito"
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   PUT:{
     url: 'api_direccion/category/:id'
     parametros: {id : "id de la categoria a modificar"},
     body:{
       name: string!,
     },
     respuestas: {
       200: {
         message : "categoria modificada con éxito"
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   DELETE:{
     url : 'api_direccion/category/:id',
     parametros: {id: "id de la categora a eliminar"},
     respuestas: {
       200: {message: "Categoria eliminado con éxito"},
       500: {message: "Error, contacte con soporte"}
     }
   },
 }
