"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ticket",
      [
        {
          id: "1",
          price: 4000000,
          type_off_class:"Business Class",
          airport_id:"1",
          flight_id:"2",
          createdAt: new Date(),
          updatedAt: new Date(),

          id: "2",
          price: 1500000,
          type_off_class:"Economy Class",
          airport_id:"2",
          flight_id:"2",
          createdAt: new Date(),
          updatedAt: new Date(),

          id: "3",
          price: 20000000,
          type_off_class:"First Class",
          airport_id:"1",
          flight_id:"2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ticket", null, {});
  },
};
