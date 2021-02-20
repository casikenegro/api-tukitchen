'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', 
    [
      {
        name: "Comida Rapida",
        user_id: 2
      }, 
      {
        name: "Mexicana",
        user_id: 2
      },
      {
        name: "Bebidas",
        user_id: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
