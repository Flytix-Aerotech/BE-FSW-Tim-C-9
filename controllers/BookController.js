const { book, passenger, ticket, seat } = require("../models/");
const { getTransactionStatus } = require("../middleware/midtrans");
const cron = require("node-cron");

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

    const newBooking = await book.create({
      full_name: books.full_name,
      clan_name: books.clan_name,
      email: books.email,
      phone_number: books.phone_number,
      ticket_id: req.ticket.id,
      total_booking: adult,
      total_price: total_booking * req.ticket.price + 0.1 * total_booking * req.ticket.price,
      booking_code: generateCode(8),
      payment_status: "Pending",
    });

    const totalAdults = parseInt(adult);
    const totalBabies = parseInt(baby) || 0;
    const totalPassengers = totalAdults + totalBabies;

    const passengerData = await passenger.bulkCreate(
      Array(totalPassengers)
        .fill()
        .map((_, index) => {
          const isAdult = index < totalAdults;
          const passengerRole = isAdult ? "Dewasa" : "Bayi";
          const passenger = passengers[index] || {}; // Retrieve passenger data if available

          return {
            full_name: passenger.full_name || null,
            clan_name: passenger.clan_name || null,
            birth_date: passenger.birth_date || null,
            nik_number: passenger.nik_number || null,
            nationality: passenger.nationality || null,
            passenger_role: passengerRole,
            booking_id: newBooking.id,
          };
        }),
      { fields: ["full_name", "clan_name", "birth_date", "nik_number", "nationality", "passenger_role", "booking_id"] }
    );

    const seatPick = await seat.bulkCreate(
      seats.map((seat) => ({
        flight_id: req.flight.id,
        seat_number: seat.seat_number,
        booking_id: newBooking.id,
      })),
      { fields: ["flight_id", "seat_number", "booking_id"] }
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
      message: "Data Anda berhasil disimpan!",
      passengerData,
      seatPick,
      newBooking,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const payBooking = async (req, res) => {
  try {
    const { code } = req.params;
    const data = await book.findOne({
      where: {
        booking_code: code,
      },
      include: [{ model: ticket }, { model: passenger }],
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 404).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBooking,
  payBooking,
};
