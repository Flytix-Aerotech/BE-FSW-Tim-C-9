"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          id: 1,
          price: 4000000,
          type_of_class: "Quiet",
          airport_id: 3,
          flight_id: 2,
          passenger_id: null,
        },
        {
          id: 2,
          price: 1500000,
          type_of_class: "Economy",
          airport_id: 2,
          flight_id: 1,
          passenger_id: null,
        },
        {
          id: 3,
          price: 20000000,
          type_of_class: "First",
          airport_id: 1,
          flight_id: 2,
          passenger_id: null,
        },
        {
          id: 4,
          price: 20000000,
          type_of_class: "Business",
          airport_id: 1,
          flight_id: 2,
          passenger_id: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
