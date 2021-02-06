const sequelizePaginate = require('sequelize-paginate')
module.exports = (Sequelize,DataTypes) => {
  const Product = Sequelize.define('product',{ 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    youtube_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    time_for_preparation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_premium : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })

  Product.associate = model => {
    Product.hasMany(model.ProductCategories,{
      foreignKey: 'product_id',
      as : 'product_categories'
    })

    Product.hasMany(model.ProductGallery,{
      foreignKey: 'product_id',
      as : 'gallery'
    })

    Product.hasMany(model.ProductDaysAvailable,{
      foreignKey: 'product_id',
      as : 'days_avialable'
    })

    Product.belongsTo(model.User,{
      foreignKey: 'user_id',
      as : 'users'
    })
  }
  sequelizePaginate.paginate(Product)
  return Product;
}
