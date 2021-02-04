const config = require("../config/config.json");

const Sequelize = require("sequelize");
let dbConfig = config.development;
if (process.env.NODE_ENV === "production"){
  dbConfig = config.production;
}
if (process.env.NODE_ENV === "test"){
  dbConfig = config.test;
}
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port:dbConfig.port
});



module.exports = sequelize;