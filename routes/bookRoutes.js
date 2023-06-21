const router = require('express').Router();
const auth = require('../middleware/Auth');
const { continuePayment, paymentDeadline } = require('../middleware/continuePayment');
const BookController = require('../controllers/BookController');

router.post('', BookController.addBooking);
router.delete('/:id', BookController.deleteBooking);
router.get('/pay/:code', BookController.payBooking);

module.exports = router;
