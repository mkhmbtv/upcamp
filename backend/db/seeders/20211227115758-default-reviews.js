'use strict';
const { User, Spot } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const spots = await Spot.findAll();

    return queryInterface.bulkInsert('Reviews', [
      {
        userId: users[2].id,
        spotId: spots[0].id,
        title: 'Amazing weekend',
        body: 'Great camp and hosts! It was awesome to have such a peaceful and relaxing time in nature!',
        recommended: true,
      },
      {
        userId: users[3].id,
        spotId: spots[0].id,
        title: 'Beautiful spot!',
        body: "Lots of great sights and one of the best camps I've ever camped at.",
        recommended: true,
      },
      {
        userId: users[1].id,
        spotId: spots[1].id,
        title: '10/10 would visit again!',
        body: "We had truly amazing camping experience and plan on visiting again in the near future.",
        recommended: true,
      },
      {
        userId: users[2].id,
        spotId: spots[5].id,
        title: 'Incredible treehouse camping',
        body: "Really beautiful and cozy treehouse. We had great time!",
        recommended: true,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
