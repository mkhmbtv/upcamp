'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotType = sequelize.define('SpotType', {
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {});
  SpotType.associate = function(models) {
    // associations can be defined here
  };
  return SpotType;
};