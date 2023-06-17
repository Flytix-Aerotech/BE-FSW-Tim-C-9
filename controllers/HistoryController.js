const { book, ticket, passenger } = require('../models/');
const { Op } = require("sequelize");
const moment = require('moment');

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

const getBookingCode = async (req, res) => {
    try {
        const { code } = req.params;
        const data = await ticket.findOne({
            where: {
                booking_code: code
            },
            include: [
                {
                    model: book
                },
                {
                    model: passenger
                },
            ],
        });
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const filterBooking = async (req, res) => {
    try {
        const { date } = req.query;
        const data = await book.findAll({
            where: {
                createdAt: {
                    [Op.between]: [ // ?start=year-month-day&end=year-month-day
                        moment(date).startOf('day').toISOString(),
                        moment(date).endOf('day').toISOString()
                    ]
                },
            },
            include: [
                {
                    model: ticket
                },
                {
                    model: passenger
                },
            ],
        });

        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
}

module.exports = {
    getBooking,
    getBookingCode,
    filterBooking,
};
