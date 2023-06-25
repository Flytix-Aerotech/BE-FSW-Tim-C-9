"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */

const hashedPassword = bcrypt.hashSync("rahasia", 10);
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          full_name: "dummy user",
          username: "dummy_",
          email: "dummy@example.com",
          phone_number: "085278322391",
          password: hashedPassword,
          role: "user",
          photo: null,
          verify: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          full_name: "dummy user two",
          username: "dummy_two",
          email: "dummy_user@gmail.com",
          phone_number: "081098732216",
          password: hashedPassword,
          role: "user",
          photo: null,
          verify: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
