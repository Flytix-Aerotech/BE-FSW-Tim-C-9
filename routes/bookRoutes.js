const router = require("express").Router();
const Payment = require("../middleware/continuePayment");
const Auth = require("../middleware/Auth");
const { payBooking, addBooking } = require("../controllers/BookController");
const ticket = require("../middleware/tickets");

router.post("/:id", Auth.verifyUser, Auth.isUser, ticket.isAvailable, addBooking);
router.get("/pay/:code", Auth.verifyUser, Auth.isUser, Payment.continuePayment, payBooking);

module.exports = router;
