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
          image_brand: null,
          price: 4000000,
          payment_status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 32,
          type_of_payment: "Akulaku",
          image_brand: null,
          price: 6000000,
          payment_status: false,
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