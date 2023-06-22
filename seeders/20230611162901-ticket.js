"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          price: 2900000,
          type_of_class: "Premium",
          airport_id: 14,
          flight_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2940000,
          type_of_class: "Premium",
          airport_id: 13,
          flight_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2110000,
          type_of_class: "Economy",
          airport_id: 12,
          flight_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2543000,
          type_of_class: "First",
          airport_id: 11,
          flight_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2123000,
          type_of_class: "Business",
          airport_id: 10,
          flight_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2154000,
          type_of_class: "Premium",
          airport_id: 9,
          flight_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2354000,
          type_of_class: "First",
          airport_id: 8,
          flight_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2567000,
          type_of_class: "Business",
          airport_id: 7,
          flight_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2783000,
          type_of_class: "Premium",
          airport_id: 6,
          flight_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2231000,
          type_of_class: "Economy",
          airport_id: 5,
          flight_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2321000,
          type_of_class: "Business",
          airport_id: 4,
          flight_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2123000,
          type_of_class: "First",
          airport_id: 3,
          flight_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2345000,
          type_of_class: "Premium",
          airport_id: 2,
          flight_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 2345000,
          type_of_class: "Premium",
          airport_id: 1,
          flight_id: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
