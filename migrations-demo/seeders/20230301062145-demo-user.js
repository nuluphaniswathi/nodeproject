'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //take array
    //iterate for 10 times
    //create user obj
    //push to array
    await queryInterface.bulkInsert("users",[{
      username:"ravi",
      email:"ravi@gmail.com",
      city:"huderabad",
      age:21,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:"swathi",
      email:"swathi@gmail.com",
      city:"hyderabad",
      age:21,
      createdAt:new Date(),
      updatedAt:new Date()
    }],{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
