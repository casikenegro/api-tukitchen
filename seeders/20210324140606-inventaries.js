'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventaries', 
    [
      {
        day:"LUNES",
        stock:1,
        time_init:"12:00",
        time_final:"16:00",
        product_id: 1,
        user_id :3,
      }, 
      {
        day:"MARTES",
        stock:1,
        time_init:"12:00",
        time_final:"16:00",
        product_id: 2,
        user_id :3,
      },
      {
        day:"LUNES",
        stock:1,
        time_init:"12:00",
        time_final:"16:00",
        product_id: 3,
        user_id :4,
      },
      {
        day:"LUNES",
        stock:1,
        time_init:"12:00",
        time_final:"16:00",
        product_id: 4,
        user_id :5,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventaries', null, {});
  }
};
