module.exports = (Sequelize,DataTypes) => {
  const ProductDaysAvailable = Sequelize.define('products_days_available',{
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })


  return ProductDaysAvailable;
}
