'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventories', 
    [
      {
        day:"LUNES",
        stock:1,
        product_id: 1,
        profile_id :3,
      }, 
      {
        day:"MARTES",
        stock:1,
        product_id: 2,
        profile_id :3,
      },
      {
        day:"LUNES",
        stock:1,
        product_id: 3,
        profile_id :4,
      },
      {
        day:"SABADO",
        stock:1,
        product_id: 4,
        profile_id :5,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventories', null, {});
  }
};
