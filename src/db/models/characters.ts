'use strict';

import { Model } from 'sequelize';


interface CharactersAttributes {
  id: number;
  name: string;
  gender: string;
  species_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Character extends Model<CharactersAttributes> implements CharactersAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    gender!: string;
    species_id!: number;


    static associate(models: any) {
      // define association here
      Character.belongsToMany(models.Films, {
        through: 'Films_Characters',
        foreignKey: 'characters_id'
      })
      Character.belongsTo(models.Species, { as: 'Species', foreignKey: "species_id"})
    }
  }
    Character.init(
      {
        id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender:{
          type: DataTypes.STRING,
          allowNull: false
        },
        species_id: {
            field: 'species_id',
            allowNull: true,
            type: DataTypes.INTEGER,
            references: {
              model: 'Species',
              key: 'id'
            }
        }
      
      }, {
      sequelize,
      modelName: 'Characters',
    });
  return Character;
};
