const { book, ticket } = require("../models");

const continuePayment = (req, res, next) => {
  const { code } = req.params; // Retrieve code from URL parameters
  const { code: queryCode } = req.query; // Retrieve code from query parameters

  const bookingCode = code || queryCode; // Use the value from URL parameters if available, otherwise use the value from query parameters

  book
    .findOne({
      where: { booking_code: bookingCode },
    })
    .then((foundBook) => {
      req.book = foundBook; // Menyimpan data booking yang ditemukan ke dalam objek req untuk digunakan di middleware atau router berikutnya

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
