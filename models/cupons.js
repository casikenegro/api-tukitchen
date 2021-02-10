'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (Sequelize,DataTypes) => {
  const Cupons = Sequelize.define('cupons',{
    profile_id: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.DECIMAL(2,2)
    },
    is_used: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false,
    }
  })

  Cupons.associate = model => {
    Cupons.belongsTo(model.Profile,{
      foreignKey: "profile_id",
      as: "profile"
    })
    Cupons.hasMany(model.OrderCupons,{
      foreignKey: "cupon_id",
      as: "order_cupons"
    })
  }
  sequelizePaginate.paginate(Cupons)
  return Cupons;
}