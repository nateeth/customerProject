'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate({ Topic }) {
      this.hasMany(Topic, { foreignKey: 'langId' });
    }
  }
  Language.init(
    {
      langName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Language',
    },
  );
  return Language;
};
