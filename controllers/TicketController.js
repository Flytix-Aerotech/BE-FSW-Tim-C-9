const { tickets, airports, flights } = require('../models');
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
      const getTicket = await tickets.findOne(
          {
              where: { id, },
          },
          {
              include: [
                  {
                      model: airports
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

const addTicket = async (req, res) => {
    try {
        const newTicket = await tickets.create(req.body);
        res.status(200).json({
            message: 'tiket berhasil ditambahkan',
            newTicket,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id, } = req.params;
        await tickets.update(req.body, { where: { id, }, });
        res.status(200).json({
            message: 'tiket berhasil diubah',
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id, } = req.params;
        await tickets.destroy({ where: { id, }, });
        res.status(200).json({
            message: 'tiket berhasil dihapus',
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};
  

// const searchTicket = async (req, res) => {
//     console.log('coba search');
//     try {
//       const {departure_date,arrival_date,departure_location,arrival_location,airport_name,airport_location,type_of_class,price,} = req.body;
//       const Tickets = await tickets.findAll({
//         where: {
//           '$flights.departure_date$' : { [Op.ne]: departure_date},
//           '$flights.arrival_date$' : { [Op.ne]: arrival_date},
//           '$flights.departure_location': { [Op.ne]: departure_location},
//           '$flights.arrival_location': { [Op.ne]: arrival_location},
//           '$airpots.airport_name': { [Op.ne]: airport_name},
//           '$airpots.airport_location': { [Op.ne]: airport_location},
//           type_of_class,
//           price,
//         },
//         include: [
//           {
//             model: airports,
//             as: 'airports',
//           },
//           {
//             model: flights,
//             as: 'flights',
//           },
//         ],
//     // include : {
//     //     model: airports,
//     //     as: 'airport',
//     //     where: {
//     //         departure_date : { [Op.ne]: `${ departure_date}`},
//     //         arrival_date : { [Op.ne]: `${arrival_date}`},
//     //         departure_location: { [Op.ne]: `${departure_location}`},
//     //         arrival_location: { [Op.ne]: `${arrival_location}`},
//     //         airport_name: { [Op.ne]: `${ airport_name}`},
//     //         airport_location : { [Op.ne] : `${airport_location}`},
//     //         type_of_class,
//     //         price,
//     //     }
//     // }
//       });
     
//       res.status(200).json({
//         status: 'success',
//         data: Tickets,
//       });
//     } catch (err) {
//       res.status(404).json({
//         status: 'failed',
//         message: err.message,
//       });
//     }
//   };

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
            '$flights.departure_date$' : { [Op.ne]: departure_date},
            '$flights.arrival_date$' : { [Op.ne]: arrival_date},
            '$flights.departure_location': { [Op.ne]: departure_location},
            '$flights.arrival_location': { [Op.ne]: arrival_location},
            '$airpots.airport_name': { [Op.ne]: airport_name},
            '$airpots.airport_location': { [Op.ne]: airport_location},
          type_of_class,
          price,
        },
        include: [
          {
            model: airports,
            as: 'airport'
          },
          {
            model: flights,
            as: 'flight'
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
    addTicket,
    updateTicket,
    deleteTicket,
    searchTicket,
};