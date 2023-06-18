"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "payments",
      [
        {
          id: 31,
          type_of_payment: "Gopay",
          price: 4000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 32,
          type_of_payment: "Akulaku",
          price: 6000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payments", null, {});
  },
};