'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventories_hours', 
    [
      {
        inventory_id: 1, 
        hour: "00:00", 
      }, 
      {
        inventory_id: 1, 
        hour: "00:30", 
      },
      {
        inventory_id: 1, 
        hour: "01:00", 
      }, 
      {
        inventory_id: 1, 
        hour: "01:30", 
      },
      {
        inventory_id: 1, 
        hour: "02:00", 
      }, 
      {
        inventory_id: 1, 
        hour: "02:30", 
      },     {
        inventory_id: 2, 
        hour: "12:00", 
      }, 
      {
        inventory_id: 2, 
        hour: "12:30", 
      },     {
        inventory_id: 2, 
        hour: "13:00", 
      }, 
      {
        inventory_id: 2, 
        hour: "13:30", 
      },     {
        inventory_id: 2, 
        hour: "14:00", 
      }, 
      {
        inventory_id: 3, 
        hour: "14:30", 
      },     {
        inventory_id: 3, 
        hour: "15:00", 
      }, 
      {
        inventory_id: 4, 
        hour: "15:30", 
      }, 
      {
        inventory_id: 4, 
        hour: "16:00", 
      },
     
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventories_hours', null, {});
  }
};
