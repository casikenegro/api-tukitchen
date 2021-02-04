module.exports = (Sequelize,DataTypes) => {
  const Inventary = Sequelize.define('inventary',{
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hour_available: {
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

  Inventary.associate = model => {
    Inventary.belongsTo(model.Product,{
      foreignKey: "id_product",
      as : 'product'
    })
  }
  return Inventary;
}
