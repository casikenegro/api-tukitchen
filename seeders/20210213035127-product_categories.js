'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_categories', 
    [
      {
        product_id: 1,// sopa de macaco
        category_id: 1, //carne
      }, 
      {
        product_id: 1,// sopa de macaco
        category_id: 2, //sopa
      },
      {
        product_id: 2,//carne con papas
        category_id: 1, //carne
      },
      {
        product_id: 2,//carne con papas
        category_id: 3, //papas
      },
      {
        product_id: 3,//carne con papas
        category_id: 1, //papas
      },
      {
        product_id: 4,//carne con papas
        category_id: 1, //papas
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_categories', null, {});
  }
};
