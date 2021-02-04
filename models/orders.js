module.exports = (Sequelize,DataTypes) => {
  const Inventary = Sequelize.define('inventary',{
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day_adviable: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hour_adviable: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    is_repeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    id_product:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })


  return Inventary;
}
