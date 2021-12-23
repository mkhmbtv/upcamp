'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotAmenity = sequelize.define('SpotAmenity', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amenityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  SpotAmenity.associate = function(models) {
    // associations can be defined here
  };
  return SpotAmenity;
};