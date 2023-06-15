const router = require("express").Router();
const Auth = require("../middleware/Auth");
const TicketController = require("../controllers/TicketController");

router.get('', TicketController.getTicket);
router.get('/:id', TicketController.getTicketById);
router.get('/search', TicketController.searchTicket);
router.post('', TicketController.addTicket);
router.put('/:id', TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

module.exports = router;