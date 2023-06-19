"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "flights",
      [
        {
          id: 1,
          flight_number: 203,
          departure_time: "13:00",
          arrival_time: "15:00",
          departure_date: new Date(),
          arrival_date: new Date(),
          departure_location: "Bali",
          arrival_location: "Lampung",
          from_id: "JKT",
          to_id: "SBY",
          airline: "Lion Air",
          capacity: 3,
          economy_class_price: 1000000,
          business_class_price: 2000000,
          first_class_price: 3000000,
          quiet_class_price: 4000000,
          type_of_flight: "OneWay",
        },
        {
          id: 2,
          flight_number: 303,
          departure_time: "08:00",
          arrival_time: "09:00",
          departure_date: new Date(),
          arrival_date: new Date(),
          departure_location: "Yogyakarta",
          arrival_location: "Bandung",
          from_id: "JKT",
          to_id: "SBY",
          airline: "Garuda Indonesia",
          capacity: 3,
          economy_class_price: 1000000,
          business_class_price: 2000000,
          first_class_price: 3000000,
          quiet_class_price: 4000000,
          type_of_flight: "OneWay",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("flights", null, {});
  },
};
