"use strict";

const { DATEONLY } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "airports",
      [
        {
          id: 3,
          name: "Juanda",
          location: "Surabaya",
          code: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Soekarna",
          location: "Jakarta",
          code: "1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airports", null, {});
  },
};
