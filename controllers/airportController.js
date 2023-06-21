const { airport } = require("../models");
const catchAsync = require("../utils/catchAsync");

const getAirport = catchAsync(async (req, res) => {
  await airport
    .findAll()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const getAirplaneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await airport
    .findOne({ where: { id } })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const addAirport = catchAsync(async (req, res) => {
  const { name, location, code } = req.body;
  await airport
    .create({ name, location, code })
    .then((data) => res.status(201).json({ message: "Airport has been added successfully", data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const updateAirport = async (req, res) => {
  const { name, location, code } = req.body;
  const { id } = req.params;
  await airport
    .update({ name, location, code }, { where: { id } })
    .then(() => res.status(201).json({ message: "Airport has been updated successfully" }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
};

const deleteAirport = async (req, res) => {
  const { id } = req.params;
  await airport
    .destroy({ where: { id } })
    .then(() => res.status(201).json({ message: "Airport has been deleted successfully" }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
};

module.exports = {
  getAirport,
  getAirplaneById,
  addAirport,
  updateAirport,
  deleteAirport,
};
