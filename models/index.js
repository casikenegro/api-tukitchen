const Sequelize = require('sequelize');

const sequelize = require('../database');

let models = {
  Carrier  : require('./carriers')(sequelize, Sequelize),
  CarrierAddress  : require('./carrierAddresses')(sequelize, Sequelize),
  Categories  : require('./categories')(sequelize, Sequelize),
  Product  : require('./product')(sequelize, Sequelize),
  ProductCategories  : require('./productCategories')(sequelize, Sequelize),
  ProductDaysAvailable : require('./product_days_available')(sequelize, Sequelize),
  ProductGallery  : require('./productGallery')(sequelize, Sequelize),
  Profile  : require('./profile')(sequelize, Sequelize),
  User : require('./user')(sequelize, Sequelize),
  UserAddress : require('./userAddress')(sequelize, Sequelize),
  Inventaries: require("./inventaries")(sequelize, Sequelize)
};

Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

models.Op = Sequelize.Op
module.exports = models;
