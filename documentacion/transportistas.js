/*
  los campos en el body con el signo de exclamación "!" son requeridos
*/
 {
   GET : {
     url: 'api_direccion/carrier'
     parametros: {},
     respuestas: {
       200: {
         "transportistas": [
               {
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
               "addreses": [
                   {
                       "id": 3,
                       "id_carrier": 5,
                       "latitude": "-121233.jjh",
                       "longitude": "23234234.233",
                       "address": "ciudad jardin",
                       "createdAt": "2020-12-17T00:34:44.000Z",
                       "updatedAt": "2020-12-17T00:34:44.000Z"
                   },
                   {
                       "id": 4,
                       "id_carrier": 5,
                       "latitude": "-121233.aaa",
                       "longitude": "23234234.555",
                       "address": "prados",
                       "createdAt": "2020-12-17T00:34:44.000Z",
                       "updatedAt": "2020-12-17T00:34:44.000Z"
                   }
               ]
           },
        ]
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   GET : {
     url: 'api_direccion/carrie/:id'
     parametros: {id: "id del transportista a buscar"},
     respuestas: {
       200: {
         "transportista": {
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
           "addreses": [
               {
                   "id": 3,
                   "id_carrier": 5,
                   "latitude": "-121233.jjh",
                   "longitude": "23234234.233",
                   "address": "ciudad jardin",
                   "createdAt": "2020-12-17T00:34:44.000Z",
                   "updatedAt": "2020-12-17T00:34:44.000Z"
               },
               {
                   "id": 4,
                   "id_carrier": 5,
                   "latitude": "-121233.aaa",
                   "longitude": "23234234.555",
                   "address": "prados",
                   "createdAt": "2020-12-17T00:34:44.000Z",
                   "updatedAt": "2020-12-17T00:34:44.000Z"
               }
           ]
         }
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   POST:{
     url: 'api_direccion/carrier'
     parametros: {},
     body:{
       name: string!,
       phone: (string,number)!,
       addresses: array[{longitude: string!, latitude: string!, address: string!}],
       radio: string!,
       base_price: number!,
       extra_price: number!,
       extra_distance: number!,
     }
     respuestas: {
       200: {
         message: "Transportista creado con éxito"
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   PUT:{
     url: 'api_direccion/carrier/:id'
     parametros: {id : "id del transportista a modificar"},
     body:{
       name: string!,
       phone: (string,number)!,
       addresses: array[{longitude: string!, latitude: string!, address: string!}],
       radio: string!,
       base_price: number!,
       extra_price: number!,
       extra_distance: number!,
     }
     respuestas: {
       200: {
         message : "Transportista modificado con éxito"
       },
       422:{
         message: "El transportista no ha podido ser modificado con éxito, de persistir este error contacte con soporte"
       },
       500: {
         message: 'Error, contacte con soporte'
       },
     }
   },
   DESTROY:{
     url : 'api_direccion/carrier/:id',
     parametros: {id: "id del transportista a eliminar"},
     respuestas: {
       200: {message: "transportista eliminado con éxito"},
       500: {message: "Error, contacte con soporte"}
     }
   }
 }
