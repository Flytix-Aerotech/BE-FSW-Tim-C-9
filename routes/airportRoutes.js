const router = require("express").Router();
const { getAirport, getAirplaneById, addAirport, updateAirport, deleteAirport } = require("../controllers/AirportController");

router.get("/", getAirport);
router.get("/:id", getAirplaneById);
router.post("/", addAirport);
router.put("/:id", updateAirport);
router.delete("/:id", deleteAirport);

module.exports = router;
