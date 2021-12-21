'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpotTypes', [
      {
        type: 'Tent camping'
      },
      {
        type: 'RV park'
      },
      {
        type: 'Cabin'
      },
      {
        type: 'Treehouse'
      },
      {
        type: 'Glamping'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SpotTypes', null, {});
  }
};
