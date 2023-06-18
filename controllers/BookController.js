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
        total_booking
    } = req.body
    try {
        const passengerData = [];
        const seatPick = [];
        for (let i = 0; i < 1; i++) {
            passengerData[i] = await passenger.create({
                full_name: full_name[i],
                clan_name: clan_name[i],
                birth_date: birth_date[i],
                nik_number: nik_number[i],
                nationality: nationality[i],
                passenger_role: passenger_role[i],
            });
            seatPick[i] = await seat.create({
                flight_id: req.flight.id,
                seat_number: seat_number[i],
            });
        }
        const newBooking = await book.create({
            full_name,
            clan_name,
            email,
            phone_number,
            ticket_id,
            passenger_id: passengerData.map(p => p.id),
            seat_id: seatPick.map(s => s.id),
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

// tambah [1] TransactionController put null transaction.payment_id jika status_payment false melebihi waktu 24 jam
// tambah [2] BookController get all data seat id dan hit api deleteBooking lalu put kembali book.seat_id dan seat.*
// jika dalam 24 tidak dibayar maka akan hit api [1] dan deleteBooking
// Jika status_payment true maka tidak bisa hit api payTransaction dan akan hit api [2]
/** FE : Jika status_payment true maka tampilan booking issued, jika currentDate dikurangi trans_date hasilnya bilangan bulat maka tampilan booking cancelled
 jika bukan keduanya, maka tampilan booking unpaid
*/

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