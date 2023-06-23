const router = require("express").Router();
const Auth = require("../middleware/Auth");
const { getPassenger, getPassengerById, addPassenger, updatePassenger, deletePassenger } = require("../controllers/passengerController");

router.get("/", Auth.verifyUser, Auth.isUser, getPassenger);
router.get("/:id", Auth.verifyUser, Auth.isUser, getPassengerById);
router.post("/", Auth.verifyUser, Auth.isUser, addPassenger);
router.put("/:id", Auth.verifyUser, Auth.isUser, updatePassenger);
router.delete("/:id", Auth.verifyUser, Auth.isUser, deletePassenger);

module.exports = router;
