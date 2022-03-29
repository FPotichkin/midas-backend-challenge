'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Films', 'charactersToDate', {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    );
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Films', 'charactersToDate', {
      charactersToDate:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  }
};