'use strict';
const { Spot, Amenity } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const spots = await Spot.findAll({ attributes: ['id'], order: ['id'] });
    const amenities = await Amenity.findAll({ order: ['id'] });

    return queryInterface.bulkInsert('SpotAmenities', [
      { spotId: spots[0].id, amenityId: amenities[0].id },
      { spotId: spots[0].id, amenityId: amenities[1].id },
      { spotId: spots[0].id, amenityId: amenities[2].id },
      { spotId: spots[0].id, amenityId: amenities[3].id },
      { spotId: spots[0].id, amenityId: amenities[4].id },
      { spotId: spots[0].id, amenityId: amenities[5].id },
      { spotId: spots[0].id, amenityId: amenities[6].id },
      { spotId: spots[0].id, amenityId: amenities[7].id },
      { spotId: spots[0].id, amenityId: amenities[8].id },
      { spotId: spots[1].id, amenityId: amenities[0].id },
      { spotId: spots[1].id, amenityId: amenities[1].id },
      { spotId: spots[1].id, amenityId: amenities[2].id },
      { spotId: spots[1].id, amenityId: amenities[3].id },
      { spotId: spots[1].id, amenityId: amenities[4].id },
      { spotId: spots[1].id, amenityId: amenities[5].id },
      { spotId: spots[1].id, amenityId: amenities[6].id },
      { spotId: spots[1].id, amenityId: amenities[7].id },
      { spotId: spots[2].id, amenityId: amenities[0].id },
      { spotId: spots[2].id, amenityId: amenities[2].id },
      { spotId: spots[2].id, amenityId: amenities[4].id },
      { spotId: spots[2].id, amenityId: amenities[5].id },
      { spotId: spots[2].id, amenityId: amenities[6].id },
      { spotId: spots[2].id, amenityId: amenities[8].id },
      { spotId: spots[3].id, amenityId: amenities[0].id },
      { spotId: spots[3].id, amenityId: amenities[1].id },
      { spotId: spots[3].id, amenityId: amenities[2].id },
      { spotId: spots[3].id, amenityId: amenities[3].id },
      { spotId: spots[3].id, amenityId: amenities[4].id },
      { spotId: spots[3].id, amenityId: amenities[6].id },
      { spotId: spots[3].id, amenityId: amenities[7].id },
      { spotId: spots[3].id, amenityId: amenities[8].id },
      { spotId: spots[4].id, amenityId: amenities[1].id },
      { spotId: spots[4].id, amenityId: amenities[2].id },
      { spotId: spots[4].id, amenityId: amenities[3].id },
      { spotId: spots[4].id, amenityId: amenities[6].id },
      { spotId: spots[4].id, amenityId: amenities[7].id },
      { spotId: spots[4].id, amenityId: amenities[8].id },
      { spotId: spots[5].id, amenityId: amenities[0].id },
      { spotId: spots[5].id, amenityId: amenities[1].id },
      { spotId: spots[5].id, amenityId: amenities[2].id },
      { spotId: spots[5].id, amenityId: amenities[3].id },
      { spotId: spots[5].id, amenityId: amenities[4].id },
      { spotId: spots[5].id, amenityId: amenities[5].id },
      { spotId: spots[5].id, amenityId: amenities[6].id },
      { spotId: spots[6].id, amenityId: amenities[0].id },
      { spotId: spots[6].id, amenityId: amenities[1].id },
      { spotId: spots[6].id, amenityId: amenities[2].id },
      { spotId: spots[6].id, amenityId: amenities[3].id },
      { spotId: spots[6].id, amenityId: amenities[4].id },
      { spotId: spots[6].id, amenityId: amenities[6].id },
      { spotId: spots[6].id, amenityId: amenities[8].id },
      { spotId: spots[7].id, amenityId: amenities[0].id },
      { spotId: spots[7].id, amenityId: amenities[1].id },
      { spotId: spots[7].id, amenityId: amenities[2].id },
      { spotId: spots[7].id, amenityId: amenities[4].id },
      { spotId: spots[7].id, amenityId: amenities[6].id },
      { spotId: spots[8].id, amenityId: amenities[0].id },
      { spotId: spots[8].id, amenityId: amenities[1].id },
      { spotId: spots[8].id, amenityId: amenities[3].id },
      { spotId: spots[8].id, amenityId: amenities[5].id },
      { spotId: spots[8].id, amenityId: amenities[6].id },
      { spotId: spots[8].id, amenityId: amenities[8].id },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SpotAmenities', null, {});
  }
};
