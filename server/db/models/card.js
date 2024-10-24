'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate({ User, Topic, Progress }) {
      this.belongsTo(User, { foreignKey: 'authorId' });
      this.belongsTo(Topic, { foreignKey: 'topicId' });
      this.hasMany(Progress, { foreignKey: 'cardId' });
    }
  }
  Card.init(
    {
      value: DataTypes.STRING,
      translation: DataTypes.STRING,
      topicId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Card',
    },
  );
  return Card;
};
