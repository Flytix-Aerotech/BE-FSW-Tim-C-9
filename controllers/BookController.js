const { book, passenger, seat } = require('../models/');

const addBooking = async (req, res) => {
    const {
        full_name,
        clan_name,
        birth_date,
        nik_number,
        nationality,
        seat_number,
        email,
        phone_number,
        total_booking
    } = req.body
    try {
        const passengerData = [];
        for (let i = 0; i < adult_passenger; i++) {
            passengerData.push(await passenger.create({
                full_name,
                clan_name,
                birth_date,
                nik_number,
                nationality,
            }));
        }
        const seatPick = [];
        for (let i = 0; i < adult_passenger; i++) {
            seatPick.push(await seat.create({
                flight_id: req.flight.id,
                seat_number,
            }));
        }
        const newBooking = await book.create({
            email,
            phone_number,
            ticket_id,
            passenger_id: passengerData.map(passenger => passenger.id),
            seat_id: seatPick.map(seat => seat.id),
            total_booking,
        });
        res.status(200).json({
            message: 'Data Anda berhasil disimpan!',
            newBooking,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id, } = req.params;
        await seat.destroy({ where: { id, }, });
        res.status(200).json({});
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addBooking,
    deleteBooking,
};