const { tickets, airports } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const getTicket = async (req, res) => {
    try {
        const Tickets = await tickets.findAll({
            include: [
                {
                    model: airports
                },
            ],
        });
        res.status(200).json({
            Tickets,
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

const searchTicket = async (req, res) => {
    try {
      const {
        departure_date,
        arrival_date,
        departure_location,
        arrival_location,
        airport_name,
        airport_location,
        type_of_class,
        price,
      } = req.body;
  
      const Tickets = await tickets.findAll({
        where: {
          // departure_date,
          // arrival_date,
          // departure_location,
          // arrival_location,
          // airport_name,
          // airport_location,
          // type_of_class,
          // price,
            departure_date: {
              [Op.endsWith]: departure_date,
            },
            arrival_date: {
              [Op.endsWith]: arrival_date,
            },
            airport_name: {
              [Op.endsWith]: '$airports.airport_name$',
            },
            airport_location: {
              [Op.endsWith]: airport_location,
            },
        },
        include: [
          {
            model: airports,
            as: 'airport',
            // where: {
            //   airport_name,
            //   airport_location,
            // },
          },
          {
            model: flights,
            as: 'flight',
            where: {
              departure_date,
              arrival_date,
              departure_location,
              arrival_location,
            },
          },
          {
            model: flights,
            include: [airports],
          },
        ],
      });
  
      res.status(200).json({
        status: 'success',
        data: Tickets,
      });
    } catch (err) {
      res.status(404).json({
        status: 'failed',
        message: err.message,
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