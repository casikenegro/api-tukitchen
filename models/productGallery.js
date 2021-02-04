module.exports = (Sequelize,DataTypes) => {
  const ProductGallery = Sequelize.define('product_gallery',{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })


  return ProductGallery;
}
