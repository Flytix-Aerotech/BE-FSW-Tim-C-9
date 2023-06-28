const { book, passenger, ticket, seat, airport, flight } = require("../models/");
const { getTransactionStatus } = require("../middleware/midtrans");
const cron = require("node-cron");
const catchAsync = require("../utils/catchAsync");

const addBooking = async (req, res) => {
  function generateCode(length) {
    var code = "";
    while (code.length < length) {
      var char = Math.random().toString(36).substr(2, 1);
      if (Math.random() < 0.5) {
        char = char.toUpperCase();
      }
      code += char;
    }
    return code;
  }

  try {
    const { books, passengers, seats } = req.body;
    const { adult, baby } = req.query;
    const { id } = req.params;

    const tickets = await ticket.findByPk(id);

    const totalAdults = parseInt(adult);
    const totalBabies = parseInt(baby) || 0;
    const totalPassengers = totalAdults + totalBabies;

    const newBooking = await book.create({
      full_name: books.full_name,
      clan_name: books.clan_name,
      email: books.email,
      phone_number: books.phone_number,
      ticket_id: tickets.id,
      total_booking: totalAdults,
      total_price: totalAdults * tickets.price + 0.1 * totalAdults * tickets.price,
      booking_code: generateCode(8),
      payment_status: "Pending",
    });

    const passengerData = await passenger.bulkCreate(
      Array(totalPassengers)
        .fill()
        .map((_, index) => {
          const isAdult = index < totalAdults;
          const passengerRole = isAdult ? "Dewasa" : "Bayi";
          const passengerIndex = passengers[index] || {}; // Retrieve passenger data if available

          return {
            full_name: passengerIndex.full_name || null,
            clan_name: passengerIndex.clan_name || null,
            birth_date: passengerIndex.birth_date || null,
            nik_number: passengerIndex.nik_number || null,
            nationality: passengerIndex.nationality || null,
            passenger_role: passengerRole,
            booking_id: newBooking.id,
          };
        }),
      { fields: ["full_name", "clan_name", "birth_date", "nik_number", "nationality", "passenger_role", "booking_id"] }
    );

    const seatPick = await seat.bulkCreate(
      seats.map((seatIndex) => ({
        seat_number: seatIndex.seat_number,
        booking_id: newBooking.id,
      })),
      { fields: ["seat_number", "booking_id"] }
    );

    cron.schedule("* * * * *", async () => {
      try {
        const statusResponse = await getTransactionStatus(newBooking.booking_code);
        let paymentStatus;

        if (statusResponse.transaction_status === "settlement") {
          paymentStatus = "Issued";
        } else if (statusResponse.transaction_status === "failure" || statusResponse.transaction_status === "cancel") {
          paymentStatus = "Cancelled";
        } else {
          paymentStatus = "Pending";
        }

        await newBooking.update({ payment_status: paymentStatus });
      } catch (error) {
        console.error(error);
      }
    });

    cron.schedule("59 59 23 * * *", async () => {
      // 59 second 59 minutes 23 hours
      if (newBooking.payment_status !== "Issued") {
        await seat.destroy({
          where: { booking_id: newBooking.id },
        });
        await book.update({ payment_status: "Cancelled" }, { where: { id: newBooking.id } });
      }
    });

    res.status(200).json({
      msg: "Data Anda berhasil disimpan!",
      data: { passengerData, seatPick, newBooking },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      msg: error.message,
    });
  }
};

const payBooking = catchAsync(async (req, res) => {
  const { code } = req.params;
  await book
    .findOne({
      where: { booking_code: code },
      include: [{ model: ticket, include: [{ model: airport }, { model: flight }] }, { model: passenger }],
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

module.exports = {
  addBooking,
  payBooking,
};
