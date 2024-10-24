'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    static associate({ User, Card }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Card, { foreignKey: 'cardId', onDelete: 'CASCADE' });
    }
  }
  Progress.init(
    {
      userId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER,
      isOpened: DataTypes.BOOLEAN,
      isStudied: DataTypes.BOOLEAN,
    },
    {
      sequelize,
    modelName: 'Progress',
    hooks: {
      beforeDestroy: async (progress) => {
        await Card.destroy({ where: { progressId: progress.id } });
      },
    },
  }
  );
  return Progress;
};