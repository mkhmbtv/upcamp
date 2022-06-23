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
        userId: users[0].id,
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
      {
        userId: users[0].id,
        spotId: spots[1].id,
        title: 'Awesome',
        body: "Really beautiful and cool place!",
        recommended: true,
      },
      {
        userId: users[0].id,
        spotId: spots[2].id,
        title: 'Nice campspot',
        body: "Great camping trip.",
        recommended: true,
      },
      {
        userId: users[0].id,
        spotId: spots[5].id,
        title: 'Cool trip!',
        body: "One of the best camping experiences!",
        recommended: true,
      },
      {
        userId: users[0].id,
        spotId: spots[3].id,
        title: 'Kinda meh',
        body: "It was ok",
        recommended: false,
      },
      {
        userId: users[1].id,
        spotId: spots[2].id,
        title: 'Amazing views',
        body: "Beautiful place",
        recommended: true,
      },
      {
        userId: users[1].id,
        spotId: spots[4].id,
        title: 'Cool campspot',
        body: "Had a great time here!",
        recommended: true,
      },
      {
        userId: users[3].id,
        spotId: spots[6].id,
        title: 'Could be better',
        body: "There's place for improvement",
        recommended: false,
      },
      {
        userId: users[0].id,
        spotId: spots[6].id,
        title: 'Pretty nice campspot',
        body: "Great place to relax",
        recommended: true,
      },
      {
        userId: users[3].id,
        spotId: spots[7].id,
        title: 'Loved it here',
        body: "Great place and people!",
        recommended: true,
      },
      {
        userId: users[2].id,
        spotId: spots[8].id,
        title: 'Was pleasantly surprised',
        body: "Pretty nice and cozy atmosphere!",
        recommended: true,
      },
      {
        userId: users[0].id,
        spotId: spots[7].id,
        title: 'Beautiful nature',
        body: "Had amazing time here",
        recommended: true,
      },
      {
        userId: users[2].id,
        spotId: spots[3].id,
        title: 'Would visit again',
        body: "Amazing campspot",
        recommended: true,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
