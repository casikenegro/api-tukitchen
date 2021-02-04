module.exports = (Sequelize,DataTypes) => {
  const Payment = Sequelize.define('payments',{
    id_seller:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_buyer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    payment_method : {
      type: DataTypes.ENUM(['Fisico','Flow']),
      allowNull: false,
    },
    number_order:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    send_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value_of_send: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER, //1 pendiente, 2 confirmado, 3 anulado
      allowNull: false,
      defaultValue: 1
    },
    id_carrier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_discount_coupons: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    flow_order_payment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name_pdf: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

  Payment.associate = model => {
      Payment.hasMany(model.PaymentProducts,{
        foreignKey : 'id_payment',
        as: "products"
      })

      Payment.belongsTo(model.User,{
        foreignKey : 'id_seller',
        as: "seller"
      })

      Payment.belongsTo(model.User,{
        foreignKey : 'id_buyer',
        as: "buyer"
      })

      Payment.belongsTo(model.Carrier,{
        foreignKey : 'id_carrier',
        as: "carrier"
      })
  }

  return Payment;
}
