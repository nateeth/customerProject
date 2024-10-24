'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    static associate({ User, Group }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Group, { foreignKey: 'groupId' });
    }
  }
  UserGroup.init(
    {
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserGroup',
    },
  );
  return UserGroup;
};
