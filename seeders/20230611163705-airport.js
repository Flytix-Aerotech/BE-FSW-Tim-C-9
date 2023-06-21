"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "airports",
      [
        {
          departure_name: "Juanda",
          arrival_name: "Adi Sucipto",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 3B Domestik",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airports", null, {});
  },
};
