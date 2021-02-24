'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', 
    [
      {
        name: "sopa de verduras",
        description: "comida",
        price: 350,
        time_for_preparation: 6,
        profile_id: 3
      }, 
      {
        name: "carne con papas",
        description: "comida",
        price: 350,
        time_for_preparation: 6,
        profile_id: 3
      },
      {
        name: "Hamburguer (MC Combo)",
        description: "Hamburguesa de mc donals",
        price: 500,
        time_for_preparation: 6,
        profile_id: 4
      },
      {
        name: "Hamburguer (King Combo)",
        description: "Hamburguesa de mc burguer king",
        price: 400,
        time_for_preparation: 6,
        profile_id: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
