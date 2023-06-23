const router = require("express").Router();
const Auth = require("../middleware/Auth");
const { continuePayment } = require("../middleware/continuePayment");
const { chargeMidtrans } = require("../middleware/midtrans");
const { makePayment } = require("../controllers/PaymentController");

router.post("", Auth.verifyUser, Auth.isUser, continuePayment, chargeMidtrans, makePayment);

module.exports = router;
