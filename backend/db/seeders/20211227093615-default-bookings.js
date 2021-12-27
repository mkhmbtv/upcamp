'use strict';
const { User, Spot } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ order: ['id'] });
    const spots = await Spot.findAll({ order: ['id'] });
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: users[0].id,
        spotId: spots[0].id,
        numGuests: 5,
        startDate: new Date('2021-12-30'),
        endDate: new Date('2022-01-02'),
      },
      {
        userId: users[0].id,
        spotId: spots[2].id,
        numGuests: 7,
        startDate: new Date('2022-02-15'),
        endDate: new Date('2022-02-21'),
      },
      {
        userId: users[0].id,
        spotId: spots[5].id,
        numGuests: 2,
        startDate: new Date('2022-04-07'),
        endDate: new Date('2022-04-12'),
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
