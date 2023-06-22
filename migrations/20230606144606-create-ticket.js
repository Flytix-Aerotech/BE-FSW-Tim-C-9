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
      premium_price: {
        type: Sequelize.DOUBLE,
      },
      first_price: {
        type: Sequelize.DOUBLE,
      },
      economy_price: {
        type: Sequelize.DOUBLE,
      },
      bussines_price: {
        type: Sequelize.DOUBLE,
      },
      type_of_class: {
        type: Sequelize.ENUM("Economy", "Business", "First", "Premium"),
      },
      airport_id: {
        type: Sequelize.INTEGER,
      },
      flight_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("tickets");
  },
};
