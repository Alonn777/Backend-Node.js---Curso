'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('contacts', 'status', {
      type: Sequelize.ENUM("ACTIVE", "ARCHIVE"),
      allowNull: false,
      defaultValue: 'ACTIVE'

    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('contacts', 'status', {transaction});
      await queryInterface.sequelize.query("DROP TYPE enum_contacts_status", {
        transaction
      })
    })

  }
};
