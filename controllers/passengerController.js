const { passenger } = require("../models");
const catchAsync = require("../utils/catchAsync");

const getPassenger = catchAsync(async (req, res) => {
  await passenger
    .findAll()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const getPassengerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await passenger
    .findOne({ where: { id } })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const addPassenger = catchAsync(async (req, res) => {
  const { full_name, clan_name, birth_date, nik_number, nationality, passenger_role } = req.body;
  await passenger
    .create({ full_name, clan_name, birth_date, nik_number, nationality, passenger_role })
    .then((data) => res.status(201).json({ msg: "Passenger has been created successfully", data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const updatePassenger = catchAsync(async (req, res) => {
  const { full_name, clan_name, birth_date, nik_number, nationality, passenger_role } = req.body;
  const { id } = req.params;

  await passenger
    .update({ full_name, clan_name, birth_date, nik_number, nationality, passenger_role }, { where: { id } })
    .then(() => res.status(201).json({ msg: "Passenger has been updated successfully" }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const deletePassenger = catchAsync(async (req, res) => {
  const { id } = req.params;

  await passenger
    .destroy({ where: { id } })
    .then(() => res.status(201).json({ msg: "Passenger has been deleted successfully" }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

module.exports = {
  getPassenger,
  getPassengerById,
  addPassenger,
  updatePassenger,
  deletePassenger,
};
