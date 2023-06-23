"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "seats",
      [
        {
          id: 999,
          flight_id: 3,
          seat_number: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 888,
          flight_id: 3,
          seat_number: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seats", null, {});
  },
};
