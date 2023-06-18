"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "airports",
      [
        {
          id: 1,
          name:"Soekarno Hatta",
          location:"Jakarta",
          code:"JKT-SH",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          id: 2,
          name:"Juanda",
          location:"Surabaya",
          code:"SBY-JD",
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
