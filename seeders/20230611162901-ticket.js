"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          price: 2235000,
          type_of_class: "Premium",
          airport_id: 14,
          flight_id: 1,
        },
        {
          price: 2645000,
          type_of_class: "Premium",
          airport_id: 13,
          flight_id: 2,
        },
        {
          price: 1345000,
          type_of_class: "Economy",
          airport_id: 12,
          flight_id: 3,
        },
        {
          price: 9745000,
          type_of_class: "First",
          airport_id: 11,
          flight_id: 4,
        },
        {
          price: 6785000,
          type_of_class: "Business",
          airport_id: 10,
          flight_id: 5,
        },
        {
          price: 2315000,
          type_of_class: "Premium",
          airport_id: 9,
          flight_id: 6,
        },
        {
          price: 9345000,
          type_of_class: "First",
          airport_id: 8,
          flight_id: 7,
        },
        {
          price: 5645000,
          type_of_class: "Business",
          airport_id: 7,
          flight_id: 8,
        },
        {
          price: 2045000,
          type_of_class: "Premium",
          airport_id: 6,
          flight_id: 9,
        },
        {
          price: 1345000,
          type_of_class: "Economy",
          airport_id: 5,
          flight_id: 10,
        },
        {
          price: 7345000,
          type_of_class: "Business",
          airport_id: 4,
          flight_id: 11,
        },
        {
          price: 10345000,
          type_of_class: "First",
          airport_id: 3,
          flight_id: 12,
        },
        {
          price: 2432000,
          type_of_class: "Economy",
          airport_id: 2,
          flight_id: 13,
        },
        {
          price: 3345000,
          type_of_class: "Premium",
          airport_id: 1,
          flight_id: 14,
        },
        {
          price: 6345000,
          type_of_class: "Business",
          airport_id: 5,
          flight_id: 10,
        },
        {
          price: 1345000,
          type_of_class: "Economy",
          airport_id: 1,
          flight_id: 14,
        },
        {
          price: 12345000,
          type_of_class: "First",
          airport_id: 3,
          flight_id: 12,
        },
        {
          price: 9345000,
          type_of_class: "First",
          airport_id: 3,
          flight_id: 12,
        },
        {
          price: 15345000,
          type_of_class: "First",
          airport_id: 3,
          flight_id: 12,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
