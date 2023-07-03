"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */

const hashedPassword = bcrypt.hashSync("rahasia", 10);
module.exports = {
  async up(queryInterface, Sequelize) {},

  async down(queryInterface, Sequelize) {},
};
