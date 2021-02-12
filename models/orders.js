'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (Sequelize,DataTypes) => {
  const Orders = Sequelize.define('orders',{
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("IN-PROGRESS",'SUCCESS',"FAIL"), 
      defaultValue: "IN-PROGRESS",
      allowNull: false,
    },
    total:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("FLOW","CASH"),
      allowNull: false,
    },
  })
  Orders.associate = model => {
    Orders.belongsTo(model.User,{
      foreignKey: "user_id",
      as: "user"
    })
    Orders.belongsTo(model.Profile,{
      foreignKey: "profile_id",
      as: "profile"
    })

    Orders.hasMany(model.OrderProducts,{
      foreignKey: "order_id",
      as: "orderProducts",
      onDelete: 'CASCADE'
    })
  }
  sequelizePaginate.paginate(Orders)
  return Orders;
}