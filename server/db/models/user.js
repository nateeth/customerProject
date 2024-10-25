'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Group, UserGroup, Topic, Card, Progress}) {
      this.hasMany(Group, { foreignKey: 'userId' });
      this.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
      this.hasMany(Topic, { foreignKey: 'authorId' });
      this.hasMany(Card, { foreignKey: 'authorId' });
      this.hasMany(Progress, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      hashPass: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
