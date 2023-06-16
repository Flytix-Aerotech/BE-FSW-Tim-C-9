const { book, passenger, seat } = require('../models/');

const addBooking = async (req, res) => {
    const {
        full_name,
        clan_name,
        birth_date,
        nik_number,
        nationality,
        passenger_role,
        seat_number,
        email,
        phone_number,
    } = req.body
    try {
        const passengerData = await passenger.create({
            full_name,
            clan_name,
            birth_date,
            nik_number,
            nationality,
            passenger_role,
            users_id: req.user.id,
        });
        const seatPick = await seat.create({
            flight_id: req.flight.id,
            seat_number,
        });
        const newBooking = await book.create({
            email,
            phone_number,
            ticket_id,
            passenger_id: passengerData.id,
            seat_id: seatPick.id,
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