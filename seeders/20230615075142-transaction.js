"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          id: 41,
          booking_id: 11,
          payment_id: 31,
          user_id: null,
          total_price: 4000000,
          trans_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 42,
          booking_id: 12,
          payment_id: 32,
          user_id: null,
          total_price: 6000000,
          trans_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};