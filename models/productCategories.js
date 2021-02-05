module.exports = (Sequelize,DataTypes) => {
  const ProductCategories = Sequelize.define('product_categories',{
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })

  ProductCategories.associate = model => {
    ProductCategories.belongsTo(model.Category,{
      foreignKey: "id_category",
      as: "category"
    });
    ProductCategories.belongsTo(model.Category,{
      foreignKey: "id_product",
      as: "product"
    });
  }
  return ProductCategories;
}
