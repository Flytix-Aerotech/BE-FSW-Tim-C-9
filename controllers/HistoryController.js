const { book, ticket, passenger, seat } = require('../models/');

let getBooking = async (req, res) => {
    try {
        let booking = await book.findAll(
            {
                include: [
                    {
                        model: ticket
                    },
                    {
                        model: passenger
                    },
                    {
                        model: seat
                    },
                ],
            }
        );

        res.status(200).json({
            booking,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id, } = req.params;
        const data = await ticket.findByPk(id,
            {
                include: [
                    {
                        model: book
                    },
                    {
                        model: passenger
                    },
                ],
            }
        );
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getBooking,
    getBookingById,
};
