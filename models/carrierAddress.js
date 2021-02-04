module.exports = (Sequelize,DataTypes) => {
  const CarrierAddress = Sequelize.define('carrier_address',{
    id_carrier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })


  return CarrierAddress;
}
