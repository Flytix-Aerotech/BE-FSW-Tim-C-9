const { transaction, book } = require('../models/');

const addTransaction = async (req, res) => {
    try {
        const createTransaction = await transaction.create({
            booking_id: req.book.id,
            payment_id,
            user_id: req.user.id,
            total_price: req.book.total_price,
            trans_date,
            payment_status,
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