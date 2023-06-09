const router = require("express").Router();
// midleware
const auth = require("../middleware/Auth");
const bookingController = require("../controllers/bookingController");

//const { getBooking, bookingsUser, getBookingById, addBooking, updateBooking, deleteBooking } = require("../controllers/bookingController");

//Booking
router.get("", auth, getBooking);
router.get("/user", auth, bookingsUser);
router.get("/:id", auth, getBookingById);
router.post("", auth, addBooking);
router.put("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;
