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
    Spot.belongsTo(models.User, { foreignKey: 'userId' });
    Spot.belongsTo(models.SpotType, { foreignKey: 'spotTypeId' });
    Spot.hasMany(models.Image, { foreignKey: 'spotId' });
    Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    Spot.hasMany(models.Review, { foreignKey: 'spotId' });
    Spot.belongsToMany(models.Amenity, {
      through: 'SpotAmenity',
      otherKey: 'amenityId',
      foreignKey: 'spotId',
      as: 'amenities',
    });
  };
  Spot.findWithStuff = async (spotId) => {
    const { Image, Review, SpotType } = require('./');
    const spot = await Spot.findByPk(spotId, { include: [SpotType] });
    const reviews = await Review.findAll({ where: { spotId } });
    const images = await Image.findAll({ where: { spotId } });
    const amenities = await spot.getAmenities();
    spot.dataValues.Images = images.map((image) => image.id);
    spot.dataValues.Reviews = reviews.map((review) => review.id);
    spot.dataValues.Amenities = amenities.map((amenity) => amenity.id);
    return spot;
  };
  return Spot;
};