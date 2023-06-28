const { ticket, airport, flight } = require("../models");
const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");

const getTicket = async (req, res) => {
  try {
    const Tickets = await ticket.findAll({
      include: [
        {
          model: airport,
        },
        {
          model: flight,
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
    const { id } = req.params;
    const Tickets = await ticket.findOne(
      {
        where: { id },
      },
      {
        include: [
          {
            model: airport,
          },
          {
            model: flight,
          },
        ],
      }
    );
    res.status(200).json({
      Tickets,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const addTicket = async (req, res) => {
  try {
      const newTicket = await ticket.create(req.body);
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
      await ticket.update(req.body, { where: { id, }, });
      res.status(200).json({
          message: 'tiket berhasil diubah',
      });
  } catch (error) {
      res.status(error.statusCode || 500).json({
          message: error.message,
      });
  }
};

const filterTicket = catchAsync(async (req, res) => {
  const { departure_date, arrival_date, departure_location, arrival_location, type_of_class } = req.body;

  await ticket
    .findAll({
      where: { type_of_class: type_of_class },
      include: [
        {
          model: flight,
          as: "flight",
          where: {
            departure_date: departure_date,
            arrival_date: arrival_date === undefined ? departure_date : arrival_date,
            departure_location: { [Op.substring]: `${departure_location}` },
            arrival_location: { [Op.substring]: `${arrival_location}` },
          },
        },
        {
          model: airport,
          as: "airport",
        },
      ],
    })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

// const searchTicket = async (req, res) => {
//   try {
//       const { departure_date, arrival_date, departure_location, arrival_location, type_of_class } = req.query;
//       const Tickets = await ticket.findAll({
//           where: {
//               [Op.or]: [
//                   {
//                       '$flight.departure_location$': { [Op.iLike]: `%${departure_location}%` },
//                   },
//                   {
//                       '$flight.arrival_location$': { [Op.iLike]: `%${arrival_location}%` },
//                   },
//                   // {
//                   //     departure_date: departure_date,
//                   // },
//                   // {
//                   //     arrival_date: arrival_date,
//                   // },
//                   {
//                     type_of_class,
//                   },
//               ]
//           },
//           include: [{
//               model: flight,
//               as: 'flight',
//               required: true
//           },
//         //   {
//         //     model: airport,
//         //     as: 'airport',
//         //     required: true
//         // }
//       ]
//       });
//       res.status(200).json({
//           Tickets
//       });
//   } catch (error) {
//       res.status(error.statusCode || 500).json({
//           message: error.message,
//       });
//   }
// };

const searchTicket = catchAsync(async (req, res) => {
  const { dd, ad, dl, al, toc } = req.query;
  await ticket
    .findAll({
      where: { type_of_class: toc },
      include: [
        {
          model: flight,
          as: "flight",
          where: {
            departure_date: dd,
            arrival_date: ad === undefined ? dd : ad,
            departure_location: { [Op.iLike]: `${dl}` },
            arrival_location: { [Op.iLike]: `${al}` },
          },
        },
        {
          model: airport,
          as: "airport",
        },
      ],
    })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});


const deleteTicket = async (req, res) => {
  try {
      const { id, } = req.params;
      await ticket.destroy({ where: { id, }, });
      res.status(200).json({
          message: 'tiket berhasil dihapus',
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
  addTicket,
  updateTicket,
  deleteTicket,
  filterTicket,
  searchTicket,
};