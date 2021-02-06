'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('product',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      youtube_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      time_for_preparation: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_premium : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('product');
     
  }
};
