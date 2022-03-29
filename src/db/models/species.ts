'use strict';

import { Model } from 'sequelize';

interface SpeciesAttributes {
  id: number;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Specie extends Model<SpeciesAttributes> implements SpeciesAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;

    static associate(models: any) {
      // define association here
      Specie.hasMany(models.Characters, {as:'Characters', foreignKey: 'species_id'})
    }
  }
  Specie.init(
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
          unique: true
        }
      }, {
    sequelize,
    modelName: 'Species',
  });
  return Specie;
};
