"use strict";

const { DATEONLY } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "passengers",
      [
        {
          id: 8,
          full_name: "Habbin",
          clan_name: "Nofaylah",
          birth_date: "2002-04-25",
          nik_number: "8080808080808081",
          nationality: "Indonesia",
          passenger_role: "Dewasa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          full_name: "There",
          clan_name: "Nawangsih",
          birth_date: "2002-04-03",
          nik_number: "8080808080808082",
          nationality: "Indonesia",
          passenger_role: "Dewasa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("passengers", null, {});
  },
};