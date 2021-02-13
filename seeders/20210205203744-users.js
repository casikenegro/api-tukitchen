'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        rut: "123456-1",
        password:  bcrypt.hashSync("123456",10),
        role: "ADMINISTRADOR",
      },
      {
        rut: "123456-2",
        password:  bcrypt.hashSync("123456",10),
        role: "COMPRADOR",
      },      
      {
        rut: "123456-3",
        password:  bcrypt.hashSync("123456",10),
        role: "VENDEDOR",
      },
    ], 
    {
    });
  
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};