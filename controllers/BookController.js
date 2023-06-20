const { book, passenger, seat } = require('../models/');

const addBooking = async (req, res) => {
    function generateCode(length) {
        var code = '';
        while (code.length < length) {
            var char = Math.random().toString(36).substr(2, 1);
            if (Math.random() < 0.5) {
                char = char.toUpperCase();
            }
            code += char;
        }
        return code;
    };
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
    } = req.body;
    try {
        const passengerData = await passenger.bulkCreate([
            { full_name, clan_name, birth_date, nik_number, nationality, passenger_role: 'Dewasa' },
        ], { fields: ['full_name', 'clan_name', 'birth_date', 'nik_number', 'nationality', 'passenger_role'] });
        const seatPick = await seat.bulkCreate([
            { flight_id: req.flight.id },
            { seat_number },
        ], { fields: ['flight_id', 'seat_number'] });
        const newBooking = await book.create({
            full_name,
            clan_name,
            email,
            phone_number,
            ticket_id: req.ticket.id,
            passenger_id: passengerData.map(p => p.id),
            seat_id: seatPick.map(s => s.id),
            total_booking,
            total_price: (total_booking * req.ticket.price) + (0.1 * total_booking * req.ticket.price),
            booking_code: generateCode(8),
        });
        
        res.status(200).json({
            message: 'Data Anda berhasil disimpan!',
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

const deleteBooking = async (req, res) => {
    try {
        const books = await book.findOne({
            where: {
                id: req.params.id
            },
        });
        if (!books) {
            throw new Error('Booking not found');
        }
        await seat.destroy({
            where: {
                id: books.seat_id
            }
        });
        await books.update({ seat_id: null });
        res.status(200).json({
            message: 'Booking deleted successfully'
        });
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