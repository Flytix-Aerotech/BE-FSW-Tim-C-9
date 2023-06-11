"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "flight",
      [
        {
          id: "1",
          flight_number:"1",
          departure_date: "2023/06/22",
          arrival_date: "2023/06/22",
          departure_location: "Surabaya",
          arrival_location : "Jakarta",
          createdAt: new Date(),
          updatedAt: new Date(),


        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("flight", null, {});
  },
};
