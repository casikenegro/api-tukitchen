'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', 
    [
      {
        name: "carne",
        user_id: 2
      }, 
      {
        name: "sopa",
        user_id: 2
      },
      {
        name: "papas",
        user_id: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
