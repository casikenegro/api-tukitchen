module.exports = (Sequelize,DataTypes) => {
  const UserAddress = Sequelize.define('user_address',{
    id_user: {
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
    description : {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city : {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })


  return UserAddress;
}
