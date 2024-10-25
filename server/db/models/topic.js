'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate({ Language, User, Card }) {
      this.belongsTo(Language, { foreignKey: 'langId' });
      this.belongsTo(User, { foreignKey: 'authorId' });
      // this.belongsTo(Group, { foreignKey: 'groupId' });
      this.hasMany(Card, { foreignKey: 'topicId' });
    }
  }
  Topic.init(
    {
      topicName: DataTypes.STRING,
      isPublic: DataTypes.BOOLEAN,
      langId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      // groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Topic',
    },
  );
  return Topic;
};
