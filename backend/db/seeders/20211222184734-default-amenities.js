'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Amenities', [
      {
        title: 'Toilets available',
        essential: true,
      },
      {
        title: 'Campfires allowed',
        essential: true,
      },
      {
        title: 'Pets allowed',
        essential: true,
      },
      {
        title: 'Portable water available',
        essential: false,
      },
      {
        title: 'Kitchen available',
        essential: false,
      },
      {
        title: 'Showers available',
        essential: false,
      },
      {
        title: 'Picnic table available',
        essential: false,
      },
      {
        title: 'Wifi available',
        essential: false,
      },
      {
        title: 'Bins available',
        essential: false,
      },
      {
        title: 'Laundry available',
        essential: false,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Amenities', null, {});
  }
};
