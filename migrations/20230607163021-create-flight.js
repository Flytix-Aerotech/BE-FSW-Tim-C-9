"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flight_number: {
        type: Sequelize.INTEGER,
      },
      departure_time: {
        type: Sequelize.TIME,
      },
      arrival_time: {
        type: Sequelize.TIME,
      },
      departure_date: {
        type: Sequelize.DATEONLY,
      },
      arrival_date: {
        type: Sequelize.DATEONLY,
      },
      departure_location: {
        type: Sequelize.STRING,
      },
      arrival_location: {
        type: Sequelize.STRING,
      },
      from_id: {
        type: Sequelize.CHAR,
      },
      to_id: {
        type: Sequelize.CHAR,
      },
      airline: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      economy_class_price: {
        type: Sequelize.DOUBLE,
      },
      business_class_price: {
        type: Sequelize.DOUBLE,
      },
      first_class_price: {
        type: Sequelize.DOUBLE,
      },
      quiet_class_price: {
        type: Sequelize.DOUBLE,
      },
      type_of_flight: {
        type: Sequelize.ENUM("OneWay", "RoundTrip"),
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flights");
  },
};
