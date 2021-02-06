const sequelizePaginate = require('sequelize-paginate')

module.exports = (Sequelize,DataTypes) => {
  const Categories = Sequelize.define('categories',{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  })

  Categories.associate = model => {
    Categories.hasMany(model.ProductCategories,{
      foreignKey: "category_id",
      as: "product_categories"
    })
  }
  sequelizePaginate.paginate(Categories)

  return Categories;
}
