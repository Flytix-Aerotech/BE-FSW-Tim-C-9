"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departure_date: {
        type: Sequelize.DATE,
      },
      arrival_date: {
        type: Sequelize.DATE,
      },
      departure_location: {
        type: Sequelize.STRING,
      },
      arrival_location: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      class: {
        type: Sequelize.STRING,
      },
      airport_id: {
        type: Sequelize.INTEGER,
      },
      airplane_id: {
        type: Sequelize.INTEGER,
      },
      passenger_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tickets");
  },
};
