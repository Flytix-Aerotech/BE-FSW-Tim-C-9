const router = require("express").Router();
const Auth = require("../middleware/Auth");
const { getBooking, filterBooking, searchBookingCode } = require("../controllers/HistoryController");

router.get("", Auth.verifyUser, Auth.isUser, getBooking);
router.get("/filter", Auth.verifyUser, Auth.isUser, filterBooking);
router.get("/search", Auth.verifyUser, Auth.isUser, searchBookingCode);

module.exports = router;
