'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    //  * Add seed commands here.
    //  *
    //  * Example:
    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: '$2b$10$rVN4xLzilfx7lzcNHHvat.6FQtOEJ/dFzroUmPPJ3l0TR4nK2ogqa',
      createdAt: '2022-03-28 23:18:27.663+00',
      updatedAt: '2022-03-28 23:18:27.663+00'
    }], {});
    
  },

  async down (queryInterface, Sequelize) {

    //  * Add commands to revert seed here.
    //  *
    //  * Example:
    await queryInterface.bulkDelete('Users', null, {});

  }
};