"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "histories",
      [
        {
          id: 21,
          user_id: null,
          booking_id: 31,
          history_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 22,
          user_id: null,
          booking_id: 32,
          history_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("histories", null, {});
  },
};