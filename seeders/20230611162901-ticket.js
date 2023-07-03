"use strict";

/** @type {import('sequelize-cli').Migration} */

const economy = () => {
  const randomValue = Math.random() * (916980 - 729980) + 729980;
  return parseInt(randomValue);
};
const premium = () => {
  const randomValue = Math.random() * (1089980 - 889980) + 889980;
  return parseInt(randomValue);
};
const business = () => {
  const randomValue = Math.random() * (1489980 - 1019980) + 1019980;
  return parseInt(randomValue);
};
const first = () => {
  const randomValue = Math.random() * (1989980 - 1489980) + 1489980;
  return parseInt(randomValue);
};
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          price: premium(),
          type_of_class: "Premium",
          airport_id: 7,
          flight_id: 2,
        },
        {
          price: premium(),
          type_of_class: "Premium",
          airport_id: 1,
          flight_id: 3,
        },
        {
          price: economy(),
          type_of_class: "Economy",
          airport_id: 5,
          flight_id: 1,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 2,
          flight_id: 12,
        },
        {
          price: business(),
          type_of_class: "Business",
          airport_id: 14,
          flight_id: 16,
        },
        {
          price: premium(),
          type_of_class: "Premium",
          airport_id: 10,
          flight_id: 6,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 3,
          flight_id: 4,
        },
        {
          price: business(),
          type_of_class: "Business",
          airport_id: 6,
          flight_id: 19,
        },
        {
          price: premium(),
          type_of_class: "Premium",
          airport_id: 13,
          flight_id: 9,
        },
        {
          price: economy(),
          type_of_class: "Economy",
          airport_id: 4,
          flight_id: 17,
        },
        {
          price: business(),
          type_of_class: "Business",
          airport_id: 12,
          flight_id: 5,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 8,
          flight_id: 18,
        },
        {
          price: economy(),
          type_of_class: "Economy",
          airport_id: 9,
          flight_id: 7,
        },
        {
          price: premium(),
          type_of_class: "Premium",
          airport_id: 11,
          flight_id: 14,
        },
        {
          price: business(),
          type_of_class: "Business",
          airport_id: 8,
          flight_id: 8,
        },
        {
          price: economy(),
          type_of_class: "Economy",
          airport_id: 6,
          flight_id: 15,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 3,
          flight_id: 13,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 11,
          flight_id: 10,
        },
        {
          price: business(),
          type_of_class: "Business",
          airport_id: 10,
          flight_id: 11,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 15,
          flight_id: 20,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 15,
          flight_id: 21,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 15,
          flight_id: 22,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 15,
          flight_id: 23,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 15,
          flight_id: 24,
        },
        {
          price: first(),
          type_of_class: "First",
          airport_id: 15,
          flight_id: 25,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
