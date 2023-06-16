"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "flights",
      [
        {
          id: 2,
          flight_number: 3,
          departure_date: new Date(),
          arrival_date: new Date(),
          departure_location: "Bali",
          arrival_location: "Lampung",
          from_id: "JKT",
          to_id: "SBY",
          airline: "Sukhoi",
          capacity: 3,
          economy_class_price: 1000000,
          business_class_price: 2000000,
          first_class_price: 3000000,
          quiet_class_price: 4000000,
          type_of_flight: "OneWay",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          flight_number: 3,
          departure_date: new Date(),
          arrival_date: new Date(),
          departure_location: "Yogyakarta",
          arrival_location: "Bandung",
          from_id: "JKT",
          to_id: "SBY",
          airline: "Sukhoi",
          capacity: 3,
          economy_class_price: 1000000,
          business_class_price: 2000000,
          first_class_price: 3000000,
          quiet_class_price: 4000000,
          type_of_flight: "OneWay",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("flights", null, {});
  },
};
