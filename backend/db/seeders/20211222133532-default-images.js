'use strict';
const { Spot } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const spots = await Spot.findAll({
      attributes: ['id'],
      order: ['id'],
    });
    
    return queryInterface.bulkInsert('Images', [
      {
        spotId: spots[0].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171477/upcamp_assets/seeder_images/sacred-nectar-sanctuary-sacred-nectar-sanctuary-new-england_ooqacw.jpg',
      },
      {
        spotId: spots[0].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171543/upcamp_assets/seeder_images/fha3fyjpefaouili019t_f8xiy2.png',
      },
      {
        spotId: spots[0].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171287/upcamp_assets/seeder_images/yfrhkpdrbbrcxjck9ege_bztajs.jpg',
      },
      {
        spotId: spots[1].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171698/upcamp_assets/seeder_images/starlight-hills-starlight-hills-campground_dsp8fx.jpg',
      },
      {
        spotId: spots[1].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171742/upcamp_assets/seeder_images/starlight-hills-starlight-hills-campground_jujhxb.jpg',
      },
      {
        spotId: spots[1].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171801/upcamp_assets/seeder_images/starlight-hills-starlight-hills-campground_qj6jto.jpg',
      },
      {
        spotId: spots[2].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171860/upcamp_assets/seeder_images/mkvcduhhwhz9lvctpnip_l5s4h6.jpg',
      },
      {
        spotId: spots[2].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640171911/upcamp_assets/seeder_images/twisselman-ranch-twisselman-s-glamping-by-the-pond-tent-lodging_rnszst.jpg',
      },
      {
        spotId: spots[2].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172012/upcamp_assets/seeder_images/twisselman-ranch-twisselman-s-glamping-by-the-pond-boating-activity-water_crrqlt.jpg',
      },
      {
        spotId: spots[3].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172105/upcamp_assets/seeder_images/p5lkkkyrvc0xom3cxmju_dtomx0.jpg',
      },
      {
        spotId: spots[3].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172168/upcamp_assets/seeder_images/four-directions-retreat-four-directions-retreat-tiny-cabin-pacific-northwest_su8oe6.jpg',
      },
      {
        spotId: spots[3].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172361/upcamp_assets/seeder_images/four-directions-retreat-four-directions-retreat-tiny-cabin-pacific-northwest_ooichc.jpg',
      },
      {
        spotId: spots[4].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172414/upcamp_assets/seeder_images/homosassa-springs-rv-site-homosassa-springs-rv-site-with-dock_gwnbel.jpg',
      },
      {
        spotId: spots[4].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172449/upcamp_assets/seeder_images/yfnshntbrahkjbpaxkvj_lljjlh.jpg',
      },
      {
        spotId: spots[4].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172492/upcamp_assets/seeder_images/homosassa-springs-rv-site-homosassa-springs-rv-site-with-dock_zbn7qi.jpg',
      },
      {
        spotId: spots[5].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172539/upcamp_assets/seeder_images/treehouse-cabin-retreat-treehouse-cabin-retreat_s2ynia.png',
      },
      {
        spotId: spots[5].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172571/upcamp_assets/seeder_images/treehouse-cabin-retreat-treehouse-cabin-retreat_qhzxjn.jpg',
      },
      {
        spotId: spots[5].id,
        url: 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640172611/upcamp_assets/seeder_images/treehouse-cabin-retreat-treehouse-cabin-retreat_bydjuv.jpg',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
