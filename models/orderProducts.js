'use strict';
module.exports = (Sequelize,DataTypes) => {
  const orderProducts = Sequelize.define('order_products',{
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  })
  orderProducts.associate = model => {
    orderProducts.belongsTo(model.Orders,{
      foreignKey: "order_id",
      as: "orders"
    })
    orderProducts.belongsTo(model.Product,{
      foreignKey: "product_id",
      as: "products"
    })
  }
  return orderProducts;
}