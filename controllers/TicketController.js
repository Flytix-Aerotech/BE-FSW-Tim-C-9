const { ticket, airport, flight, seat } = require("../models");
const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");

const getTicket = catchAsync(async (req, res) => {
  await ticket
    .findAll({ include: [{ model: airport }, { model: flight }] })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const getTicketById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ticket
    .findOne({ where: { id }, include: [{ model: airport }, { model: flight }, { model: seat }] })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const addTicket = catchAsync(async (req, res) => {
  const { price, type_of_class, airport_id, flight_id } = req.body;

  await ticket
    .create({ price, type_of_class, airport_id, flight_id })
    .then((data) => res.status(201).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const filterTicket = catchAsync(async (req, res) => {
  const { departure_date, arrival_date, departure_location, arrival_location, type_of_class } = req.body;

  await ticket
    .findAll({
      where: { type_of_class: type_of_class },
      include: [
        {
          model: flight,
          as: "flight",
          where: {
            departure_date: departure_date,
            arrival_date: arrival_date === undefined ? departure_date : arrival_date,
            departure_location: { [Op.substring]: `${departure_location}` },
            arrival_location: { [Op.substring]: `${arrival_location}` },
          },
        },
        {
          model: airport,
          as: "airport",
        },
      ],
    })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const searchTicket = catchAsync(async (req, res) => {
  const { dd, ad, dl, al, toc } = req.query;
  await ticket
    .findAll({
      where: { type_of_class: toc },
      include: [
        {
          model: flight,
          as: "flight",
          where: {
            departure_date: dd,
            arrival_date: ad === undefined ? dd : ad,
            departure_location: { [Op.iLike]: `${dl}` },
            arrival_location: { [Op.iLike]: `${al}` },
          },
        },
        {
          model: airport,
          as: "airport",
        },
      ],
    })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
  // }
});

module.exports = {
  getTicket,
  getTicketById,
  addTicket,
  //   updateTicket,
  //   deleteTicket,
  filterTicket,
  searchTicket,
};
