const { book, payment } = require("../models/");

const makePayment = async (req, res) => {
  try {
    const { code, type } = req.query;
    const foundBook = await book.findOne({
      where: { booking_code: code },
    });

    if (!foundBook) {
      return res.status(400).json({ msg: "Invalid booking code" });
    }

    req.book = foundBook;

    const paymentData = await payment.create({
      booking_id: foundBook.id,
      type_of_payment: type,
    });

    res.status(200).json({
      paymentData,
      paymentStatus,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  makePayment,
};
