'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('carriers', {
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      radio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      base_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      extra_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      extra_distance: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('carriers');
  }
};
