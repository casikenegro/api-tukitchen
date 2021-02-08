'use strict';
module.exports = (Sequelize,DataTypes) => {
  const orderCupons = Sequelize.define('order_cupons',{
    order_id: DataTypes.INTEGER,
    cupon_id: DataTypes.INTEGER
  })

  orderCupons.associate = model => {
    orderCupons.belongsTo(model.Orders,{
      foreignKey: "order_id",
      as: "orders"
    })
    orderCupons.belongsTo(model.Cupons,{
      foreignKey: "cupon_id",
      as: "cupons"
    })
  }
  return orderCupons;
}