module.exports = (Sequelize,DataTypes) => {
  const Category = Sequelize.define('category',{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  })

  Category.associate = model => {
    Category.hasMany(model.ProductCategories,{
      foreignKey: "id_category",
      as: "product_categories"
    })
  }
  return Category;
}
