"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "flights",
      [
        {
          id: 1,
          flight_number: "TKG-0401",
          departure_time: "13:00",
          arrival_time: "15:00",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-26",
          departure_location: "Denpasar",
          arrival_location: "Bandar Lampung",
          from_id: "DPS",
          to_id: "TKG",
          airline: "Lion Air",
          type_of_flight: "OneWay",
        },

        {
          id: 2,
          flight_number: "MES-1401",
          departure_time: "06:00",
          arrival_time: "09:45",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-26",
          departure_location: "Jakarta",
          arrival_location: "Medan",
          from_id: "JKT",
          to_id: "MES",
          airline: "Citilink",
          type_of_flight: "OneWay",
        },

        {
          id: 3,
          flight_number: "JOG-1001",
          departure_time: "10:00",
          arrival_time: "12:00",
          departure_date: "2023-06-23",
          arrival_date: "2023-06-23",
          departure_location: "Bandung",
          arrival_location: "Yogyakarta",
          from_id: "BDO",
          to_id: "JOG",
          airline: "Batik Air",
          type_of_flight: "OneWay",
        },

        {
          id: 4,
          flight_number: "PNK-1601",
          departure_time: "06:00",
          arrival_time: "10:30",
          departure_date: "2023-06-22",
          arrival_date: "2023-06-22",
          departure_location: "Palu",
          arrival_location: "Pontianak",
          from_id: "PLW",
          to_id: "PNK",
          airline: "Lion Air",
          type_of_flight: "OneWay",
        },

        {
          id: 5,
          flight_number: "JOG-1002",
          departure_time: "13:00",
          arrival_time: "15:00",
          departure_date: "2023-06-25",
          arrival_date: "2023-06-25",
          departure_location: "Jakarta",
          arrival_location: "Yogyakarta",
          from_id: "JKT",
          to_id: "JOG",
          airline: "Batik Air",
          type_of_flight: "OneWay",
        },

        {
          id: 6,
          flight_number: "SRG-1901",
          departure_time: "13:00",
          arrival_time: "17:00",
          departure_date: "2023-06-28",
          arrival_date: "2023-06-28",
          departure_location: "Surabaya",
          arrival_location: "Semarang",
          from_id: "SUB",
          to_id: "SRG",
          airline: "Air Asia",
          type_of_flight: "OneWay",
        },

        {
          id: 7,
          flight_number: 203,
          departure_time: "13:00",
          arrival_time: "15:00",
          departure_date: "2023-06-29",
          arrival_date: "2023-06-30",
          departure_location: "Denpasar",
          arrival_location: "Surabaya",
          from_id: "DPS",
          to_id: "AMI",
          airline: "Lion Air",
          type_of_flight: "OneWay",
        },

        {
          id: 8,
          flight_number: "JKT-1001",
          departure_time: "20:00",
          arrival_time: "21:10",
          departure_date: "2023-06-29",
          arrival_date: "2023-06-30",
          departure_location: "Batam",
          arrival_location: "Jakarta",
          from_id: "BTH",
          to_id: "JKT",
          airline: "Garuda Indonesia",
          type_of_flight: "OneWay",
        },

        {
          id: 9,
          flight_number: "UPG-1201",
          departure_time: "15:00",
          arrival_time: "17:30",
          departure_date: "2023-06-25",
          arrival_date: "2023-06-28",
          departure_location: "Surabaya",
          arrival_location: "Makassar",
          from_id: "SBY",
          to_id: "UPG",
          airline: "Super Air Jet",
          type_of_flight: "OneWay",
        },

        {
          id: 10,
          flight_number: "LBJ-1001",
          departure_time: "10:00",
          arrival_time: "12:00",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Jakarta",
          arrival_location: "Labuan bajo",
          from_id: "JKT",
          to_id: "LBJ",
          airline: "Citilink",
          type_of_flight: "OneWay",
        },

        {
          id: 11,
          flight_number: "JKT-1002",
          departure_time: "20:00",
          arrival_time: "22:00",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Pangkal Pinang",
          arrival_location: "Jakarta",
          from_id: "PGK",
          to_id: "JKT",
          airline: "Batik Air",
          type_of_flight: "OneWay",
        },

        {
          id: 12,
          flight_number: "UPG-1202",
          departure_time: "11:45",
          arrival_time: "14:30",
          departure_date: "2023-06-23",
          arrival_date: "2023-06-23",
          departure_location: "Ambon",
          arrival_location: "Makassar",
          from_id: "AMQ",
          to_id: "UPG",
          airline: "Lion Air",
          type_of_flight: "OneWay",
        },

        {
          id: 13,
          flight_number: "JKT-1003",
          departure_time: "10:00",
          arrival_time: "12:00",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Palembang",
          arrival_location: "Jakarta",
          from_id: "PLM",
          to_id: "JKT",
          airline: "Batik Air",
          type_of_flight: "OneWay",
        },

        {
          id: 14,
          flight_number: "BDO-0201",
          departure_time: "06:50",
          arrival_time: "10:30",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Surabaya",
          arrival_location: "Bandung",
          from_id: "SBY",
          to_id: "BDO",
          airline: "Super Air jet",
          type_of_flight: "OneWay",
        },

        {
          id: 15,
          flight_number: "UPG-1202",
          departure_time: "11:40",
          arrival_time: "14:40",
          departure_date: "2023-06-23",
          arrival_date: "2023-06-23",
          departure_location: "Ambon",
          arrival_location: "Makassar",
          from_id: "AMQ",
          to_id: "UPG",
          airline: "Garuda Indonesia",
          type_of_flight: "OneWay",
        },

        {
          id: 16,
          flight_number: "UPG-1202",
          departure_time: "11:00",
          arrival_time: "14:10",
          departure_date: "2023-06-23",
          arrival_date: "2023-06-23",
          departure_location: "Ambon",
          arrival_location: "Makassar",
          from_id: "AMQ",
          to_id: "UPG",
          airline: "Super Air jet",
          type_of_flight: "OneWay",
        },

        {
          id: 17,
          flight_number: "BDO-0201",
          departure_time: "06:50",
          arrival_time: "10:35",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Surabaya",
          arrival_location: "Bandung",
          from_id: "SBY",
          to_id: "BDO",
          airline: "Batik Air",
          type_of_flight: "OneWay",
        },

        {
          id: 18,
          flight_number: "BDO-0201",
          departure_time: "07:00",
          arrival_time: "10:50",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Surabaya",
          arrival_location: "Bandung",
          from_id: "SBY",
          to_id: "BDO",
          airline: "Garuda Indonesia",
          type_of_flight: "OneWay",
        },

        {
          id: 19,
          flight_number: "BDO-0201",
          departure_time: "06:20",
          arrival_time: "10:40",
          departure_date: "2023-06-24",
          arrival_date: "2023-06-24",
          departure_location: "Surabaya",
          arrival_location: "Bandung",
          from_id: "SBY",
          to_id: "BDO",
          airline: "Super Air jet",
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
