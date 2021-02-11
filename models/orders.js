'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (Sequelize,DataTypes) => {
  const Orders = Sequelize.define('orders',{
    user_id: {
      type: DataTypes.INTEGER
    },
    profile_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("IN-PROGRESS",'SUCCESS',"FAIL"), 
      default: "IN-PROGRESS"
    },
    refence: {
      type: DataTypes.STRING
    },
    method: {
      type: DataTypes.ENUM("FLOW","CASH"),
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
      as: "orderProducts"
    })
  }
  sequelizePaginate.paginate(Orders)
  return Orders;
}