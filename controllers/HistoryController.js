const { history, user, book, ticket, passenger } = require("../models/");
const { Op } = require("sequelize");
const moment = require("moment");

const getBooking = async (req, res) => {
  try {
    const data = await history.findAll({
      include: [{ model: ticket }, { model: passenger }, { model: book }, { model: user }],
    });

    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(200).json({
        message: "Anda belum melakukan pemesanan penerbangan",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const filterBooking = async (req, res) => {
  try {
    const { date } = req.query;
    const data = await history.findAll({
      where: {
        history_date: {
          [Op.between]: [
            // ?start=YYYY-MM-DD&end=YYYY-MM-DD
            moment(date).startOf("day").toISOString(),
            moment(date).endOf("day").toISOString(),
          ],
        },
      },
      include: [{ model: ticket }, { model: passenger }, { model: book }, { model: user }],
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(error.statusCode || 404).json({
      message: error.message,
    });
  }
};

const searchBookingCode = async (req, res) => {
  try {
    const { code } = req.query;
    const data = await book.findAll({
      where: {
        booking_code: code,
      },
      include: [{ model: ticket }, { model: passenger }, { model: book }, { model: user }],
    });

    if (data.length > 0) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(200).json({
        message: "Anda belum melakukan pemesanan penerbangan",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBooking,
  filterBooking,
  searchBookingCode,
};
