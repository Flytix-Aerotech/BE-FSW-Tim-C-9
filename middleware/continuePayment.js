const moment = require('moment');
const axios = require('axios');

const continuePayment = (req, res, next) => {
  const { book, transaction } = req;

  if (!book || !transaction) {
    return res.status(400).json({ msg: 'Invalid request data' });
  }

  const { seat_id } = book;
  const { payment_status } = transaction;

  if (seat_id !== null && payment_status === true) {
    next();
  } else {
    return res.status(400).json({ msg: 'Invalid payment details' });
  }
};

const paymentDeadline = async (req, res, next) => {
  const { trans_date, payment_id } = req.transaction;

  const currentTime = moment();
  const deadline = moment(trans_date).add(24, 'hours');

  if (currentTime.isBefore(deadline)) {
    next();
  } else {
    try {
      await axios.delete('http://localhost:8000/api/v1/booking/${id}');

      // Set payment_id menjadi null pada objek transaksi
      payment_id = null;

      // Melanjutkan ke middleware atau penanganan rute selanjutnya
      next();
    } catch (error) {
      return res.status(500).json({ msg: 'Failed to delete data' });
    }
  }
};

module.exports = {
  continuePayment,
  paymentDeadline
};
