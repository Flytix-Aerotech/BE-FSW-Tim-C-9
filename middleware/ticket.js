const { ticket, seat } = require('../models')

const isAvailable = (req, res, next) => {
  const { id } = req.params;
  const { adult } = req.query;
  let adults = parseInt(adult) || 0;
  
  ticket.findByPk(id)
    .then((tickets) => {
      if (tickets) {
        req.ticket = tickets;
        
        seat.findAll({
          where: { ticket_id: tickets.id }
        })
          .then((seats) => {
            req.seat = seats;
            
            if (seats.length + adults < 61) {
              next();
            } else {
              return res.status(400).json({ msg: 'Invalid data' });
            }
          })
          .catch((error) => {
            return res.status(500).json({ msg: error });
          });
      } else {
        return res.status(404).json({ msg: 'Ticket not found' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ msg: error });
    });
};

module.exports = {
    isAvailable
};
