const router = require("express").Router();
const { getPassenger, getPassengerById, addPassenger, updatePassenger, deletePassenger } = require("../controllers/passengerController");

router.get("/", getPassenger);
router.get("/:id", getPassengerById);
router.post("/", addPassenger);
router.put("/:id", updatePassenger);
router.delete("/:id", deletePassenger);

module.exports = router;
