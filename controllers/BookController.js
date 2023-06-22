const { book, passenger, ticket, seat } = require('../models/');

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

    try {
        const { books, passengers, seats } = req.body;
        const { adult, baby } = req.query;

        // const passengerData = await passenger.bulkCreate(
        //     passengers.map((passenger, index) => ({
        //         full_name: passenger.full_name,
        //         clan_name: passenger.clan_name,
        //         birth_date: passenger.birth_date,
        //         nik_number: passenger.nik_number,
        //         nationality: passenger.nationality,
        //         passenger_role: index < adult ? 'Dewasa' : 'Bayi'
        //     })),
        //     {
        //         fields: ['full_name', 'clan_name', 'birth_date', 'nik_number', 'nationality', 'passenger_role']
        //     }
        // )

        const totalAdults = parseInt(adult);
        const totalBabies = parseInt(baby);
        const totalPassengers = totalAdults + totalBabies;

        const passengerData = await passenger.bulkCreate(
            Array(totalPassengers).fill().map((_, index) => {
                const isAdult = index < totalAdults;
                const passengerRole = isAdult ? 'Dewasa' : 'Bayi';
                const passenger = passengers[index] || {}; // Retrieve passenger data if available

                return {
                    full_name: passenger.full_name || null,
                    clan_name: passenger.clan_name || null,
                    birth_date: passenger.birth_date || null,
                    nik_number: passenger.nik_number || null,
                    nationality: passenger.nationality || null,
                    passenger_role: passengerRole,
                };
            }),
            { fields: ['full_name', 'clan_name', 'birth_date', 'nik_number', 'nationality', 'passenger_role'] }
        );

        const seatPick = await seat.bulkCreate(
            seats.map(seat => ({
                flight_id: req.flight.id,
                seat_number: seat.seat_number
            })),
            { fields: ['flight_id', 'seat_number'] }
        );

        const newBooking = await book.create({
            full_name: books.full_name,
            clan_name: books.clan_name,
            email: books.email,
            phone_number: books.phone_number,
            ticket_id: req.ticket.id,
            passenger_id: passengerData.map(p => p.id),
            seat_id: seatPick.map(s => s.id),
            total_booking: adult,
            total_price: (total_booking * req.ticket.price) + (0.1 * total_booking * req.ticket.price),
            booking_code: generateCode(8),
            payment_status: false,
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

const payBooking = async (req, res) => {
    try {
        const { code } = req.params;
        const data = await book.findOne({
            where: {
                booking_code: code
            },
            include: [
                { model: ticket },
                { model: passenger },
            ],
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
    deleteBooking,
    payBooking,
};