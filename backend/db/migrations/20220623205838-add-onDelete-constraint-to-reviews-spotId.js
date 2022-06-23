'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Reviews', 'Reviews_spotId_fkey');
    await queryInterface.addConstraint('Reviews', ['spotId'], {
      type: 'foreign key',
      name: 'Reviews_spotId_fkey',
      references: {
        table: 'Spots',
        field: 'id'
      },
      onDelete: 'CASCADE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Reviews', 'Reviews_spotId_fkey');
    await queryInterface.addConstraint('Reviews', ['spotId'], {
      type: 'foreign key',
      name: 'Reviews_spotId_fkey',
      references: {
        table: 'Spots',
        field: 'id'
      },
    })
  }
};
