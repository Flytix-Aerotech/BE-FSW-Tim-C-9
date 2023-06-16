const router = require("express").Router();
const auth = require("../middleware/Auth");
const passengerController = require("../controllers/passengerController");

router.get("/passengers", passengerController.getPassenger);
router.get("/passengers/:id", passengerController.getPassengerById);
router.post("/passengers", passengerController.addPassenger);
router.put("/passengers/:id", auth.verifyUser, auth.isUser, passengerController.updatePassenger);
router.delete("/passengers/:id", auth.verifyUser, auth.isUser, passengerController.deletePassenger);

module.exports = router;
