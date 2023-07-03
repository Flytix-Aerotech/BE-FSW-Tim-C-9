const { book, ticket, passenger, flight, airport } = require("../models/");
const { Op } = require("sequelize");
const moment = require("moment");
const catchAsync = require("../utils/catchAsync");

const getBooking = catchAsync(async (req, res) => {
  await book
    .findAll({
      where: { user_id: req.user.id },
      include: [{ model: ticket, include: [{ model: airport }, { model: flight }] }, { model: passenger }],
    })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ data });
      } else {
        res.status(400).json({ msg: "Anda belum melakukan pemesanan penerbangan" });
      }
    })
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const filterBooking = catchAsync(async (req, res) => {
  const { start, end } = req.query;
  const starting = moment(start).format("YYYYMMDD");
  const ending = moment(end).format("YYYYMMDD");
  await book
    .findAll({
      where: { createdAt: { [Op.between]: [starting, ending] } },
      include: [{ model: ticket, include: [{ model: airport }, { model: flight }] }, { model: passenger }],
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const searchBookingCode = catchAsync(async (req, res) => {
  const { code } = req.query;
  await book
    .findAll({
      where: { booking_code: code },
      include: [{ model: ticket, include: [{ model: airport }, { model: flight }] }, { model: passenger }],
    })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ data });
      } else {
        res.status(400).json({ msg: "Anda belum melakukan pemesanan penerbangan" });
      }
    });
});

module.exports = {
  getBooking,
  filterBooking,
  searchBookingCode,
};
