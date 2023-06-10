const { booking, ticket, passenger, Users } = require("../models");

let getBooking = async (req, res) => {
  try {
    let bookings = await booking.findAll({
      include: [
        {
          model: ticket,
        },
        {
          model: passenger,
        },
        {
          model: Users,
        },
      ],
    });
    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

let bookingsUser = async (req, res) => {
  try {
    let bookings = await Users.findByPk(req.user.id, {
      include: [
        {
          model: booking,
          include: [
            {
              model: ticket,
            },
            {
              model: passenger,
            },
          ],
        },
      ],
    });
    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await booking.findByPk(id, {
      include: [
        {
          model: ticket,
        },
        {
          model: passenger,
        },
        {
          model: Users,
        },
      ],
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const addBooking = async (req, res) => {
  const { passenger_name, nik, id_ticket, total_booking } = req.body;
  try {
    const passengerData = await passenger.create({
      passenger_name,
      nik,
    });
    const newBooking = await booking.create({
      id_passenger: passengerData.id,
      id_ticket,
      id_users: req.user.id,
      total_booking,
    });
    res.status(200).json({
      message: "Booking berhasil",
      newBooking,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await booking.update(req.body, { where: { id } });
    res.status(200).json({
      message: "Booking berhasil diubah",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await booking.destroy({ where: { id } });
    res.status(200).json({
      message: "Booking berhasil dihapus",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getBooking,
  bookingsUser,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
};
