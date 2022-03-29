'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Films_Characters',{
      films_id: {
        primaryKey: true,
        field: 'films_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'Films',
            key: 'id'
        },
        
    },
    characters_id: {
      primaryKey: true,
      field: 'characters_id',
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
          model: 'Characters',
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
    await queryInterface.dropTable('Films_Characters');
  }
};