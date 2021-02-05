'use strict';
const constants = require("../utils/constants");
module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('product_days_available',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id:{
        allowNull:false,
        type:Sequelize.INTEGER
      },
      day: {
        type:DataTypes.ENUM(constants.days),
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_days_available');
     
  }
};
