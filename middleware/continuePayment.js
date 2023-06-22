const moment = require('moment');
const axios = require('axios');
const { book } = require('../models')

const continuePayment = (req, res, next) => {
  const { code } = req.params; // Retrieve code from URL parameters
  const { code: queryCode } = req.query; // Retrieve code from query parameters
  
  const bookingCode = code || queryCode; // Use the value from URL parameters if available, otherwise use the value from query parameters

  book.findOne({
    where: { booking_code: bookingCode }
  })
    .then((foundBook) => {
      if (foundBook.seat_id !== null && foundBook.payment_status === false) {
        req.book = foundBook; // Menyimpan data buku yang ditemukan ke dalam objek req untuk digunakan di middleware atau router berikutnya
        next();
      } else {
        return res.status(400).json({ msg: 'Invalid payment details' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ msg: 'Error occurred while fetching book data', error });
    });
};

const paymentDeadline = async (req, res, next) => {
  const { createdAt } = req.book;

  const currentTime = moment();
  const deadline = moment(createdAt).add(24, 'hours');

  if (currentTime.isBefore(deadline)) {
    next();
  } else {
    try {
      await axios.delete('http://localhost:8000/api/v1/booking/${id}');
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
