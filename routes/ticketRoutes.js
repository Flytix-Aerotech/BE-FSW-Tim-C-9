const router = require("express").Router();
const { getTicket, getTicketById, filterTicket, searchTicket, addTicket } = require("../controllers/TicketController");
const ticket = require("../middleware/tickets");

router.get("", getTicket);
router.get("/search", searchTicket);
router.post("", addTicket);
router.get("/:id", ticket.isAvailable, getTicketById);
router.post("/filter", filterTicket);

module.exports = router;
