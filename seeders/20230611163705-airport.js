"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "airports",
      [
        {
          id: 1,
          name: "Soekarno Hatta",
          location: "Jakarta",
          code: "JKT-SH",
        },
        {
          id: 2,
          name: "Juanda",
          location: "Surabaya",
          code: "SBY-JD",
        },
        {
          id: 3,
          name: "Adi Sucipto",
          location: "Yogyakarta",
          code: "DIY-JD",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airports", null, {});
  },
};
