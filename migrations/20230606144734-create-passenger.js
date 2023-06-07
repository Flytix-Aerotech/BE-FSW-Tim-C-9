"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("passengers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
      },
      nik_number: {
        type: Sequelize.STRING,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      passenger_role: {
        type: Sequelize.ENUM(["Dewasa", "Bayi"]),
      },
      user_id: {
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
    await queryInterface.dropTable("passengers");
  },
};
