'use strict';

import { Model } from 'sequelize';

interface FilmAttributes {
  id: number;
  director: string;
  producer: string;
  title: string;
  release_date: Date;
  external_url: string;
  charactersToDate: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Film extends Model<FilmAttributes> implements FilmAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    director!: string;
    producer!: string;
    title!: string;
    release_date!: Date;
    external_url!: string;
    charactersToDate!: boolean;

    static associate(models: any) {
      // define association here
      Film.belongsToMany(models.Characters, {
        through: 'Films_Characters',
        foreignKey: 'films_id'
      })
    }
  }
    Film.init(
      {
        id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        director:{
          type: DataTypes.STRING,
          allowNull: false
        },
        producer:{
          type: DataTypes.STRING,
          allowNull: false
        },
        title:{
          type: DataTypes.STRING,
          allowNull: false
        },
        release_date:{
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        external_url:{
          type: DataTypes.STRING,
          allowNull: false
        },
        charactersToDate:{
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      }, {
      sequelize,
      modelName: 'Films',
    });
  return Film;
};