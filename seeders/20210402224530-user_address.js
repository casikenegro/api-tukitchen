'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_addresses', [
      {  
        user_id: 2,
        latitude: "-22",
        longitude: "-22",
        address:"palermo",
        description : "calle 22, avenida libertador",
        city : "Buenos Aires"
      },      
      {
        user_id:7,
        latitude: "-22",
        longitude: "-22",
        address:"palermo",
        description : "calle 22, avenida libertador",
        city : "Buenos Aires"
      }
    ], 
    {
    });
  
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_addresses', null, {});
  }
};