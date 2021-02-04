const bcrypt = require('bcrypt');

module.exports = (Sequelize,DataTypes) => {
  const User = Sequelize.define('user',{
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_parent:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },{
    freezeTableName: true,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        },
    }
  })
  User.associate = model => {

    User.belongsTo(model.Roles,{
      foreignKey: 'id_rol',
      as: 'roles'
    })

    User.hasOne(model.Profile,{
      foreignKey: 'id_user',
      as: 'profile'
    })

    User.hasMany(model.UserAddress,{
      foreignKey: 'id_user',
      as: 'addresess'
    })
  }

  return User;
}
