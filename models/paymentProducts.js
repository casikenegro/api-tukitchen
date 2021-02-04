module.exports = (Sequelize,DataTypes) => {
  const PaymentProducts = Sequelize.define('payment_products',{
    id_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    time_for_preparation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_premium : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    quantity : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total : {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
  })


  return PaymentProducts;
}
