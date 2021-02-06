'use strict';
const constants = require("../utils/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      day:{
        type: Sequelize.ENUM(constants.days), 
        allowNull: false,
      },
      time_init:{
        type: Sequelize.TIME,
        allowNull: false,
      },
      time_final:{
        type: Sequelize.TIME,
        allowNull: false,
      },
      is_repeat:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defauld: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventaries');
  }
};