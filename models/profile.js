const sequelizePaginate = require('sequelize-paginate')

module.exports = (Sequelize,DataTypes) => {
  const Profile = Sequelize.define('profile',{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_store: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secret_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  Profile.associate = model => {
    Profile.hasMany(model.Orders,{
      foreignKey: "profile_id",
      as: "orders",
      onDelete: 'CASCADE'
    })
    Profile.hasMany(model.Cupons,{
      foreignKey: "profile_id",
      as: "cupons",
      onDelete: 'CASCADE'
    })
    Profile.hasMany(model.Product,{
      foreignKey: 'profile_id',
      as: 'products',
      onDelete: 'CASCADE'
    })
  }
  sequelizePaginate.paginate(Profile)
  return Profile;
}
