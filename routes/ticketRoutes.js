const router = require("express").Router();
const Auth = require("../middleware/Auth");
const { getTicket, getTicketById, filterTicket, searchTicket } = require("../controllers/TicketController");

router.get("", getTicket);
router.get("/search", searchTicket);
router.get("/:id", getTicketById);

// router.post("", TicketController.addTicket);
// router.put("/:id", TicketController.updateTicket);
// router.delete("/:id", TicketController.deleteTicket);
router.post("/filter", filterTicket);


module.exports = router;
