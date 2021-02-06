const constants = require("../utils/constants");

module.exports = (Sequelize,DataTypes) => {
  const ProductDaysAvailable = Sequelize.define('products_days_available',{
    day: {
      type:DataTypes.ENUM(constants.days),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ')
    }
  })


  return ProductDaysAvailable;
}
