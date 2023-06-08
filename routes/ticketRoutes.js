const router = require("express").Router();
const Auth = require("../middleware/Auth");
const TicketController = require("../controllers/TicketController");

router.get('', TicketController.getTicket);
router.get('/search', TicketController.searchTicket);
router.get('/:id', TicketController.getTicketById);
// router.post('', auth, isAdmin, addTicket);
// router.put('/:id', auth, isAdmin, updateTicket);
// router.delete('/:id', auth, isAdmin, deleteTicket);

module.exports = router;