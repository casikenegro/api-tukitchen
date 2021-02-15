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
        profile_id: 3
      }, 
      {
        name: "carne con papas",
        description: "comida",
        price: 15.2,
        time_for_preparation: 6,
        profile_id: 3
      },
      {
        name: "Hamburguer (MC Combo)",
        description: "Hamburguesa de mc donals",
        price: 10.2,
        time_for_preparation: 6,
        profile_id: 4
      },
      {
        name: "Hamburguer (King Combo)",
        description: "Hamburguesa de mc burguer king",
        price: 13.2,
        time_for_preparation: 6,
        profile_id: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
