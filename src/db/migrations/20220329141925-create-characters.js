'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Characters',{
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender:{
        type: Sequelize.STRING,
        allowNull: false
      },
      species_id: {
        field: 'species_id',
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
            model: 'Species',
            key: 'id'
        }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};
