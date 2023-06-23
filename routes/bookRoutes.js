const router = require("express").Router();
const Payment = require("../middleware/continuePayment");
const Auth = require("../middleware/Auth");
const { payBooking, addBooking, deleteBooking } = require("../controllers/BookController");

router.post("", Auth.verifyUser, Auth.isUser, addBooking);
router.delete("/:id", Auth.verifyUser, Auth.isUser, deleteBooking);
router.get("/pay/:code", Auth.verifyUser, Auth.isUser, Payment.continuePayment, payBooking);

module.exports = router;
