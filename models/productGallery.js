module.exports = (Sequelize,DataTypes) => {
  const ProductGallery = Sequelize.define('product_gallery',{
    img_product: {
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
