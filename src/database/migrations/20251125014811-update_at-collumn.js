'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.renameColumn('customers', 'update_at', 'updated_at');
    await queryInterface.renameColumn('contacts', 'update_at', 'updated_at');
    await queryInterface.renameColumn('users', 'update_at', 'updated_at');

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('customers', 'update_at', 'updated_at');
    await queryInterface.renameColumn('contacts', 'update_at', 'updated_at');
    await queryInterface.renameColumn('users', 'update_at', 'updated_at');


  }
};
