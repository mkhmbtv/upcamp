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
      {
        userId: users[0].id,
        spotId: spots[1].id,
        numGuests: 3,
        startDate: new Date('2022-05-20'),
        endDate: new Date('2022-05-25'),
      },
      {
        userId: users[0].id,
        spotId: spots[4].id,
        numGuests: 4,
        startDate: new Date('2022-09-02'),
        endDate: new Date('2022-09-06'),
      },
      {
        userId: users[0].id,
        spotId: spots[3].id,
        numGuests: 2,
        startDate: new Date('2022-06-02'),
        endDate: new Date('2022-06-10'),
      },
      {
        userId: users[0].id,
        spotId: spots[6].id,
        numGuests: 4,
        startDate: new Date('2022-05-27'),
        endDate: new Date('2022-05-30'),
      },
      {
        userId: users[0].id,
        spotId: spots[7].id,
        numGuests: 3,
        startDate: new Date('2022-04-17'),
        endDate: new Date('2022-04-21'),
      },
      {
        userId: users[0].id,
        spotId: spots[8].id,
        numGuests: 4,
        startDate: new Date('2022-10-15'),
        endDate: new Date('2022-10-19'),
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
