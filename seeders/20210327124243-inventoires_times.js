'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventories_hours', 
    [
      {
        inventory_id: 1, 
        time: 1, 
      }, 
      {
        inventory_id: 1, 
        hour_id: 2, 
      },
      {
        inventory_id: 1, 
        hour_id: 3, 
      }, 
      {
        inventory_id: 1, 
        hour_id: 4, 
      }, 
      {
        inventory_id: 2, 
        hour_id: 5,       
      },
      {
        inventory_id: 2,
        hour_id: 6, 
      },
      {
        inventory_id: 2,
        hour_id: 7, 
      },
      {
        inventory_id: 3,
        hour_id: 12, 
      },
      {
        inventory_id: 3,
        hour_id: 13, 
      },    {
        inventory_id: 3,
        hour_id: 14, 
      },    
      {
        inventory_id: 3,
        hour_id: 15, 
      },
      {
        inventory_id: 4,
        hour_id: 23, 
      },
      {
        inventory_id: 4,
        hour_id: 20, 
      },  
      {
        inventory_id: 4,
        hour_id: 21, 
      },    
      {
        inventory_id: 4,
        hour_id: 22, 
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventories_time', null, {});
  }
};
