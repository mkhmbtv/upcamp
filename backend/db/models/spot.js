'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Spot.belongsTo(models.SpotType, { foreignKey: 'spotTypeId', as: 'spotType' });
    Spot.hasMany(models.Image, { foreignKey: 'spotId', as: 'images' });
    Spot.hasMany(models.Booking, { foreignKey: 'spotId', as: 'bookings' });
    Spot.hasMany(models.Review, { foreignKey: 'spotId', as: 'reviews' });
    Spot.belongsToMany(models.Amenity, {
      through: 'SpotAmenity',
      otherKey: 'amenityId',
      foreignKey: 'spotId',
      as: 'amenities',
    });
    Spot.addScope('withImages', { include: ['images'] });
    Spot.addScope('fullSpot', {
      include: [
        { model: models.User.scope('currentUser'), as: 'user' },
        { model: models.SpotType, as: 'spotType', attributes: ['type'] },
        { model: models.Image, as: 'images', attributes: ['id', 'url'] },
        { model: models.Amenity, as: 'amenities', through: { attributes: [] } },
      ],
    })
  };
  return Spot;
};