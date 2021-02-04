module.exports = (Sequelize,DataTypes) => {
  const PaymentCorrelative = Sequelize.define('payment_correlative',{
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correlative: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })


  return PaymentCorrelative;
}
