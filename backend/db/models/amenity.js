'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    essential: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {});
  Amenity.associate = function(models) {
    Amenity.belongsToMany(models.Spot, {
      through: 'SpotAmenity',
      otherKey: 'spotId',
      foreignKey: 'amenityId',
    });
  };
  return Amenity;
};