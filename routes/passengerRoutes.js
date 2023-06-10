const router = require("express").Router();
// midleware
const auth = require("../middleware/Auth");
const passengerController = require("../controllers/passengerController");

//const { getPassenger, getPassengerById, addPassenger, updatePassenger, deletePassenger } = require("../controllers/passengerController");

//passenger
router.get("/", getPassenger);
router.get("/:id", getPassengerById);
router.post("/", addPassenger);
router.put("/:id", auth, isAdmin, updatePassenger);
router.delete("/:id", auth, isAdmin, deletePassenger);

module.exports = router;
