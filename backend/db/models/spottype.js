'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotType = sequelize.define('SpotType', {
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {});
  SpotType.associate = function(models) {
    SpotType.hasMany(models.Spot, { foreignKey: 'spotTypeId' });
  };
  return SpotType;
};