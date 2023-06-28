const router = require("express").Router();
const Auth = require("../middleware/Auth");
const { isAvailable } = require("../middleware/ticket");
const { getTicket, getTicketById, filterTicket, searchTicket, addTicket } = require("../controllers/TicketController");

router.get("", getTicket);
router.get("/search", searchTicket);
router.post("", addTicket);
router.get("/:id", isAvailable, getTicketById);
// router.put("/:id", TicketController.updateTicket);
// router.delete("/:id", TicketController.deleteTicket);
router.post("/filter", filterTicket);

module.exports = router;
