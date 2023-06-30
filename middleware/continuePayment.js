const { book } = require("../models");

const continuePayment = (req, res, next) => {
  const { code } = req.params;
  const { code: queryCode } = req.query;

  const bookingCode = code || queryCode;

  book
    .findOne({
      where: { booking_code: bookingCode },
    })
    .then((foundBook) => {
      req.book = foundBook;

      if (foundBook.payment_status === "Pending") {
        next();
      } else {
        return res.status(400).json({ msg: "Invalid data" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ msg: "Error occurred while fetching book data", error });
    });
};

module.exports = {
  continuePayment,
};
