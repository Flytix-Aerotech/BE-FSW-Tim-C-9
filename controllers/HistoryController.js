const { book, ticket, passenger } = require('../models/');
const { Op } = require('sequelize');
const moment = require('moment');

let getBooking = async (req, res) => {
    try {
        let booking = await book.findAll({
            include: [
                {
                    model: ticket
                },
                {
                    model: passenger
                },
            ],
        });

        if (booking.length > 0) {
            res.status(200).json({
                booking,
            });
        } else {
            res.status(200).json({
                message: 'Anda belum melakukan pemesanan penerbangan',
            });
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const filterBooking = async (req, res) => {
    try {
        const { start, end } = req.query;
        const starting = moment(start).format('YYYYMMDD');
        const ending = moment(end).format('YYYYMMDD');
        const data = await book.findAll({
            where: {
                createdAt: {
                    [Op.between]: [ // ?start=YYYY-MM-DD&end=YYYY-MM-DD
                        starting,
                        ending
                    ]
                },
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

let searchBookingCode = async (req, res) => {
    try {
        const { code } = req.query;
        let booking = await book.findAll({
            where: {
                booking_code: code
            },
            include: [
                { model: ticket },
                { model: passenger },
            ],
        });

        if (booking.length > 0) {
            res.status(200).json({
                booking,
            });
        } else {
            res.status(200).json({
                message: 'Anda belum melakukan pemesanan penerbangan',
            });
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getBooking,
    filterBooking,
    searchBookingCode,
};
