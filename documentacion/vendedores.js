/*
  los campos en el body con el signo de exclamación "!" son requeridos
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
  }
}
