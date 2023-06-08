const { passenger } = require("../models");

const getPassenger = async (res, req) => {
  try {
    const passengers = await passenger.findAll();
    req.status(200).json({
      message: "data seluruh penumpang Flytix",
      passengers,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const getPassengerById = async (req, res) => {
  try {
    const { id } = req.params;
    const onePassenger = await passenger.findOne({ where: { id } });
    res.status(200).json({
      passenger: onePassenger,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const addPassenger = async (req, res) => {
  try {
    const newPassenger = await passenger.create(req.body);
    res.status(200).json({
      message: "data penumpang berhasil ditambahkan",
      newPassenger,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const updatePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    await passenger.update(req.body, { where: { id } });
    res.status(200).json({
      message: "data penumpang berhasil diubah",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const deletePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    await passenger.destroy({ where: { id } });
    res.status(200).json({
      message: "data penumpang berhasil dihapus",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPassenger,
  getPassengerById,
  addPassenger,
  updatePassenger,
  deletePassenger,
};
