'use strict';
const sequelizePaginate = require('sequelize-paginate')
const constants = require("../utils/constants");

module.exports = (Sequelize,DataTypes) => {
  const Inventaries = Sequelize.define('inventaries',{
    product_id: DataTypes.INTEGER,
    user_id :DataTypes.INTEGER,
    day:{
      type: DataTypes.ENUM(constants.days), 
      allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
    },
    time_init:{
      type: DataTypes.TIME,
      allowNull: false,
    },
    time_final:{
      type: DataTypes.TIME,
      allowNull: false,
    },
    is_repeat:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })

  Inventaries.associate = model => {
    Inventaries.belongsTo(model.Product,{
      foreignKey: "product_id",
      as: "product"
    });
    Inventaries.belongsTo(model.User,{
      foreignKey: "user_id",
      as: "user"
    })
  }
  sequelizePaginate.paginate(Inventaries)

  return Inventaries;
}