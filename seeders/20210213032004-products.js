'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', 
    [
      {
        name: "sopa de macaco",
        description: "comida",
        price: 15.2,
        time_for_preparation: 6,
        profile_id: 2
      }, 
      {
        name: "carne con papas",
        description: "comida",
        price: 15.2,
        time_for_preparation: 6,
        profile_id: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
