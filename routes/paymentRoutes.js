const router = require('express').Router();
const auth = require('../middleware/Auth');
const { continuePayment } = require('../middleware/continuePayment');
const { chargeMidtrans } = require('../middleware/midtrans');
const PaymentController = require('../controllers/PaymentController');

router.post('', continuePayment, chargeMidtrans, PaymentController.makePayment);

module.exports = router;
