module.exports = (Sequelize,DataTypes) => {
  const Carrier = Sequelize.define('carrier',{ //transportistas
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
    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })

  Carrier.associate = models => {
    Carrier.hasMany(models.CarrierAddress,{
      foreignKey: 'id_carrier',
      as : 'addreses'
    })
  }

  return Carrier;
}
