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


  return Category;
}
