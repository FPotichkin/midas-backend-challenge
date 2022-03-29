

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Films', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      director:{
        type: Sequelize.STRING,
        allowNull: false
      },
      producer:{
        type: Sequelize.STRING,
        allowNull: false
      },
      title:{
        type: Sequelize.STRING,
        allowNull: false
      },
      release_date:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      external_url:{
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Films');
  }
};