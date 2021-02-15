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
      },
      {
        name: "Tina",
        last_name:"Burner",
        name_store: "Mc Donals",
        email:"mcdonals@gmail.com",
        user_id:4,
        phone: 123456,
        address: "California USA",
        api_key: 123456
      },
      {
        name: "King",
        last_name:"Barrymore",
        email:"burguerking@gmail.com",
        name_store: "Burguer King",
        user_id:5,
        phone: 123456,
        address: "California USA",
        api_key: 123456
      }
    ], {});
   
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
