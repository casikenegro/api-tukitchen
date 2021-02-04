const Sequelize = require('sequelize');

const sequelize = require('../database');

let models = {
  Carrier  : require('./carrier')(sequelize, Sequelize),
  CarrierAddress  : require('./carrierAddress')(sequelize, Sequelize),
  Category  : require('./category')(sequelize, Sequelize),
  Coupons  : require('./coupons')(sequelize, Sequelize),
  Inventary  : require('./inventary')(sequelize, Sequelize),
  Payment  : require('./payment')(sequelize, Sequelize),
  PaymentCorrelative : require('./paymentCorrelative')(sequelize, Sequelize),
  PaymentProducts: require('./paymentProducts')(sequelize, Sequelize), 
  Product  : require('./product')(sequelize, Sequelize),
  ProductCategories  : require('./productCategories')(sequelize, Sequelize),
  ProductDaysAvailable : require('./product_days_available')(sequelize, Sequelize),
  ProductGallery  : require('./productGallery')(sequelize, Sequelize),
  Profile  : require('./profile')(sequelize, Sequelize),
  Roles  : require('./roles')(sequelize, Sequelize),
  User : require('./user')(sequelize, Sequelize),
  UserAddress : require('./userAddress')(sequelize, Sequelize),
};

Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

models.Op = Sequelize.Op
module.exports = models;
