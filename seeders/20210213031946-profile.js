'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('People', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
