const { ticket, airport } = require('../models');
const { search } = require('./AuthController');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const getTicket = async (req, res) => {
    try {
        const tickets = await ticket.findAll({
            include: [
                {
                    model: airport
                },
            ],
        });
        res.status(200).json({
            tickets,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id, } = req.params;
        const getTicket = await ticket.findOne(
            {
                where: { id, },
            },
            {
                include: [
                    {
                        model: airport
                    },
                ],
            }
        );
        res.status(200).json({
            ticket: getTicket,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

// const addTicket = async (req, res) => {
//     try {
//         const newTicket = await ticket.create(req.body);
//         res.status(200).json({
//             message: 'tiket berhasil ditambahkan',
//             newTicket,
//         });
//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             message: error.message,
//         });
//     }
// };

// const updateTicket = async (req, res) => {
//     try {
//         const { id, } = req.params;
//         await ticket.update(req.body, { where: { id, }, });
//         res.status(200).json({
//             message: 'tiket berhasil diubah',
//         });
//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             message: error.message,
//         });
//     }
// };

// const deleteTicket = async (req, res) => {
//     try {
//         const { id, } = req.params;
//         await ticket.destroy({ where: { id, }, });
//         res.status(200).json({
//             message: 'tiket berhasil dihapus',
//         });
//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             message: error.message,
//         });
//     }
// };

// pencarian + hasil tiket
const searchTicket = async (req, res) => {
    try {
        const {departure_date, arrival_date, departure_location,  arrival_location,  airport_name, airport_location, type_of_class, price} = req.query;
        const tickets = await ticket.findAll({
            where: {
                [Op.or]: [
                    {
                        '$flight.departure_date$': { [Op.iLike]: `%${departure_date}%` },
                    },
                    {
                        '$flight.arrival_date$': { [Op.iLike]: `%${arrival_date}%` },
                    },
                    {
                        '$flight.departure_location$': { [Op.iLike]: `%${departure_location}%` },
                    },
                    {
                        '$flight.arrival_location$': { [Op.iLike]: `%${arrival_location}%` },
                    },
                    {
                        '$airport.name$': { [Op.iLike]: `%${airport_name}%` },
                    },
                    {
                        '$airport.location$': { [Op.iLike]: `%${airport_location}%` },
                    },
                    {
                        type_of_class : { [Op.iLike]: type_of_class },
                    },
                    {
                        price: { [Op.gt]: price},
                    }, 
                ]
            },
            include: [
                {
                    model: airport,
                    as: 'airport',
                    required: true
                },
                {
                    model: flight,
                    as: 'flight',
                    required: true
                }
            ]
        });
        res.status(200).json({
            tickets
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};


module.exports = {
    getTicket,
    getTicketById,
    // addTicket,
    // updateTicket,
    // deleteTicket,
    searchTicket,
};