const { transaction, book } = require('../models/');

const addTransaction = async (req, res) => {
    try {
        const createTransaction = await transaction.create({
            booking_id,
            clan_name,
            email,
            phone_number,
            ticket_id,
            passenger_id: passengerData.map(p=>p.id),
            seat_id: seatPick.map(s=>s.id),
            total_booking,
        });
        res.status(200).json({
            message: 'Data Anda berhasil disimpan!',
            createTransaction,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const payTransaction = async (req, res) => {
};

module.exports = {
  addTransaction,
  payTransaction,
};