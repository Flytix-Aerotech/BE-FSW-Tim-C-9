const router = require("express").Router();
const Auth = require("../middleware/Auth");
const { getTicket, getTicketById, filterTicket, searchTicket, addTicket, updateTicket,deleteTicket } = require("../controllers/TicketController");

router.get("", getTicket);
router.get("/search", searchTicket);
router.get("/:id", getTicketById);
router.put("/:id", updateTicket);
router.post("/filter", filterTicket);
router.post("", addTicket);

router.delete("/:id", deleteTicket);



module.exports = router;
