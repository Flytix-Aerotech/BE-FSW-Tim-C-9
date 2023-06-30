"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "seats",
      [
        {
          id: 999,
          ticket_id: 3,
          seat_number: "C3",
          booking_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 888,
          ticket_id: 3,
          seat_number: "B2",
          booking_id: 12,
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