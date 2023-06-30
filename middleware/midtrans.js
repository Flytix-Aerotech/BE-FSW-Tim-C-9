const midtransClient = require("midtrans-client");
const { book } = require("../models/");

// Inisialisasi objek CoreApi Midtrans
const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-Dqiwi6G1WevBKBDPJsp6eFGq",
  clientKey: "SB-Mid-client-z146Ib-VBrCtq9u7",
});

const chargeMidtrans = async (req, res, next) => {
  const { code, type } = req.query;
  const foundBook = await book.findOne({
    where: { booking_code: code },
  });

  if (!foundBook) {
    return res.status(400).json({ msg: "Invalid booking code" });
  }

  req.book = foundBook;

  // Data transaksi
  const transaction_details = {
    order_id: code,
    gross_amount: foundBook.total_price,
  };

  const custom_expiry = {
    expiry_duration: 60,
    unit: "minute",
  };

  const parameter = {
    payment_type: type,
    transaction_details,
    custom_expiry,
  };

  // Melakukan pembayaran menggunakan Midtrans
  coreApi
    .charge(parameter)
    .then((chargeResponse) => {
      console.log("chargeResponse:", JSON.stringify(chargeResponse));
      res.status(200).json({ msg: "Charge successfully", chargeResponse });
      next();
    })
    .catch((err) => {
      res.status(err.statusCode || 500).json({ msg: err.message });
    });
};

const getTransactionStatus = async (bookingCode) => {
  try {
    const foundBook = await book.findOne({
      where: { booking_code: bookingCode },
    });
    if (!foundBook) {
      throw new Error("Invalid booking code");
    }

    const statusResponse = await coreApi.transaction.status(foundBook.booking_code);
    return statusResponse;
  } catch (err) {
    throw new Error(`Failed to get transaction status: ${err.message}`);
  }
};

module.exports = {
  chargeMidtrans,
  getTransactionStatus,
};
