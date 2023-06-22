"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "airports",
      [
        {
          departure_name: "Juanda",
          arrival_name: "Husein Sastranegara",
          departure_terminal: "Terminal 4B Domestik",
          arrival_terminal: "Terminal 2A Domestik",
        },
        {
          departure_name: "Sultan Mahmud Badaruddin II",
          arrival_name: "Halim Perdanakusuma",
          departure_terminal: "Terminal 2C Domestik",
          arrival_terminal: "Terminal 4D Domestik",
        },
        {
          departure_name: "Pattimura",
          arrival_name: "Sultan Hasanuddin",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 5D Domestik",
        },
        {
          departure_name: "Depati Amir",
          arrival_name: "Halim Perdanakusuma",
          departure_terminal: "Terminal 3A Domestik",
          arrival_terminal: "Terminal 6B Domestik",
        },
        {
          departure_name: "Halim Perdanakusuma",
          arrival_name: "Komodo",
          departure_terminal: "Terminal 3A Domestik",
          arrival_terminal: "Terminal 2A Domestik",
        },
        {
          departure_name: "Juanda",
          arrival_name: "Sultan Hasanuddin",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 5A Domestik",
        },
        {
          departure_name: "Internasional Hang Nadim",
          arrival_name: "Halim Perdanakusuma",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 4B Domestik",
        },
        {
          departure_name: "Ngurah Rai",
          arrival_name: "Juanda",
          departure_terminal: "Terminal 3A Domestik",
          arrival_terminal: "Terminal 1A Domestik",
        },
        {
          departure_name: "Juanda",
          arrival_name: "Jenderal Ahmad Yani",
          departure_terminal: "Terminal 8A Domestik",
          arrival_terminal: "Terminal 1B Domestik",
        },
        {
          departure_name: "Halim Perdanakusuma",
          arrival_name: "Adisutjipto",
          departure_terminal: "Terminal 1b Domestik",
          arrival_terminal: "Terminal 5B Domestik",
        },
        {
          departure_name: "Mutiara",
          arrival_name: "Supadio",
          departure_terminal: "Terminal 4A Domestik",
          arrival_terminal: "Terminal 1A Domestik",
        },
        {
          departure_name: "Husein Sastranegara",
          arrival_name: "Adisutjipto",
          departure_terminal: "Terminal 5B Domestik",
          arrival_terminal: "Terminal 3A Domestik",
        },
        {
          departure_name: "Halim Perdanakusuma",
          arrival_name: "Kualanamu",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 6B Domestik",
        },
        {
          departure_name: "Ngurah Rai",
          arrival_name: "Radin Inten II",
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
