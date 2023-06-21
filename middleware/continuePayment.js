const moment = require('moment');
const axios = require('axios');

const continuePayment = (req, res, next) => {
  const { book } = req;

  if (!book || !transaction) {
    return res.status(400).json({ msg: 'Invalid request data' });
  }

  const { seat_id, payment_status } = book;

  if (seat_id !== null && payment_status === false) {
    next();
  } else {
    return res.status(400).json({ msg: 'Invalid payment details' });
  }
};

const paymentDeadline = async (req, res, next) => {
  const { createdAt, payment_status } = req.book;

  const currentTime = moment();
  const deadline = moment(createdAt).add(24, 'hours');

  if (currentTime.isBefore(deadline)) {
    next();
  } else {
    try {
      await axios.delete('http://localhost:8000/api/v1/booking/${id}');

      // Set payment_id menjadi null pada objek transaksi
      payment_status = null;

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
