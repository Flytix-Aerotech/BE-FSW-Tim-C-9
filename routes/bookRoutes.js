const router = require('express').Router();
const auth = require('../middleware/Auth');
const { continuePayment } = require('../middleware/continuePayment');
const { payBooking, addBooking } = require('../controllers/BookController');

router.post('', addBooking);
router.get('/pay/:code', continuePayment, payBooking);

module.exports = router;
