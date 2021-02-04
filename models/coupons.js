module.exports = (Sequelize,DataTypes) => {
  const Coupons = Sequelize.define('coupons',{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    date_expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    id_store : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  })

  Coupons.associate = model => {
      Coupons.belongsTo(model.User,{
        foreignKey: "id_store",
        as: "store"
      })
  }

  return Coupons;
}
