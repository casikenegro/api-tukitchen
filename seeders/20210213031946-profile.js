'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('profiles', 
    [
      {
      name: "admin",
      last_name:"admin",
      email:"admin@gmail.com",
      user_id:1,
      },
      {
        name: "user",
        last_name:"user",
        email:"user@gmail.com",
        user_id:2,
      },
      {
        name: "user",
        last_name:"user",
        email:"user@gmail.com",
        user_id:3,
      }
    ], {});
   
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
