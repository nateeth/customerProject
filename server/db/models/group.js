'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate({ User, UserGroup, Topic }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId' });
      //this.hasMany(Topic, { foreignKey: 'groupId' });
    }
  }
  Group.init(
    {
      groupName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Group',
    },
  );
  return Group;
};
