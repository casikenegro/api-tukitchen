module.exports = (Sequelize,DataTypes) => {
  const Product = Sequelize.define('product',{ //transportistas
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
    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })

  Product.associate = model => {
    Product.hasMany(model.ProductCategories,{
      foreignKey: 'id_product',
      as : 'categories'
    })

    Product.hasMany(model.ProductGallery,{
      foreignKey: 'id_product',
      as : 'gallery'
    })

    Product.hasOne(model.Inventary,{
      foreignKey: 'id_product',
      as : 'inventary'
    })

    Product.hasMany(model.ProductDaysAvailable,{
      foreignKey: 'id_product',
      as : 'days_avialable'
    })

    Product.belongsTo(model.User,{
      foreignKey: 'id_parent',
      as : 'users'
    })
  }

  return Product;
}
