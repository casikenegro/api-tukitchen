module.exports = (Sequelize,DataTypes) => {
  const Roles = Sequelize.define('roles',{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })


  return Roles;
}
