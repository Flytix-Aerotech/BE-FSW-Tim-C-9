const { book, payment } = require("../models/");
const catchAsync = require("../utils/catchAsync");

const makePayment = catchAsync(async (req, res) => {
  const { code, type } = req.query;
  const foundBook = await book.findOne({
    where: { booking_code: code },
  });

  if (!foundBook) {
    return res.status(400).json({ msg: "Invalid booking code" });
  }

  req.book = foundBook;

  await payment
    .create({
      booking_id: foundBook.id,
      type_of_payment: type,
    })
    .then((paymentData) => res.status(200).json({ paymentData, paymentStatus }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

module.exports = {
  makePayment,
};
