"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "airports",
      [
        {
          id: 1,
          departure_name: " Husein Sastranegara",
          arrival_name: "Sultan Hasanuddin",
          departure_terminal: "Terminal 4B Domestik",
          arrival_terminal: "Terminal 2A Domestik",
        },
        {
          id: 2,
          departure_name: "Sepinggan",
          arrival_name: "Sultan Iskandar Muda",
          departure_terminal: "Terminal 2C Domestik",
          arrival_terminal: "Terminal 4D Domestik",
        },
        {
          id: 3,
          departure_name: "Hang Nadim",
          arrival_name: "Soekarno-Hatta",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 5D Domestik",
        },
        {
          id: 4,
          departure_name: "Ngurah Rai",
          arrival_name: "Juanda",
          departure_terminal: "Terminal 3A Domestik",
          arrival_terminal: "Terminal 6B Domestik",
        },
        {
          id: 5,
          departure_name: "Ngurah Rai",
          arrival_name: "Adisutjipto",
          departure_terminal: "Terminal 3A Domestik",
          arrival_terminal: "Terminal 2A Domestik",
        },
        {
          id: 6,
          departure_name: "Ahmad Yani",
          arrival_name: "Husein Sastranegara",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 5A Domestik",
        },
        {
          id: 7,
          departure_name: "Soekarno-Hatta",
          arrival_name: "Sultan Mahmud Badaruddin II",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 4B Domestik",
        },
        {
          id: 8,
          departure_name: "Sultan Syarif Kasim II",
          arrival_name: "Sam Ratulangi",
          departure_terminal: "Terminal 3A Domestik",
          arrival_terminal: "Terminal 1A Domestik",
        },
        {
          id: 9,
          departure_name: "Sultan Hasanuddin",
          arrival_name: "Hang Nadim",
          departure_terminal: "Terminal 8A Domestik",
          arrival_terminal: "Terminal 1B Domestik",
        },
        {
          id: 10,
          departure_name: "Juanda",
          arrival_name: "Ngurah Rai",
          departure_terminal: "Terminal 1b Domestik",
          arrival_terminal: "Terminal 5B Domestik",
        },
        {
          id: 11,
          departure_name: "Juanda",
          arrival_name: "Sultan Iskandar Muda",
          departure_terminal: "Terminal 4A Domestik",
          arrival_terminal: "Terminal 1A Domestik",
        },
        {
          id: 12,
          departure_name: "Soekarno-Hatta",
          arrival_name: "Adisutjipto",
          departure_terminal: "Terminal 5B Domestik",
          arrival_terminal: "Terminal 3A Domestik",
        },
        {
          id: 13,
          departure_name: "Ngurah Rai",
          arrival_name: "El Tari",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 6B Domestik",
        },
        {
          id: 14,
          departure_name: "Juanda",
          arrival_name: "Syamsudin Noor",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 3B Domestik",
        },
        {
          id: 15,
          departure_name: "Juanda",
          arrival_name: "Halim Perdanakusuma",
          departure_terminal: "Terminal 1A Domestik",
          arrival_terminal: "Terminal 7B Domestik",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airports", null, {});
  },
};
