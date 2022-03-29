'use strict';

import { Model } from 'sequelize';

interface FilmsCharactersAttributes {
    films_id: number;
    characters_id: number;
}


module.exports = (sequelize: any, DataTypes: any) => {
  class FilmsCharacters extends Model<FilmsCharactersAttributes>
  implements FilmsCharactersAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    films_id!: number;
    characters_id!: number;
    static associate(models: any) {
      // define association here
    }
  }
  FilmsCharacters.init({
    films_id: {
        primaryKey: true,
        field: 'films_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'Films',
            key: 'id'
        },
    },
    characters_id: {
      primaryKey: true,
      field: 'characters_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
          model: 'Characters',
          key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Films_Characters',
    timestamps: true
    });
  return FilmsCharacters;
};