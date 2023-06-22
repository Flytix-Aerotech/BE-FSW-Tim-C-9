const router = require('express').Router();
const auth = require('../middleware/Auth');
const { continuePayment } = require('../middleware/continuePayment');
const { payBooking, addBooking, deleteBooking} = require('../controllers/BookController');

router.post('', addBooking);
router.delete('/:id', deleteBooking);
router.get('/pay/:code', continuePayment, payBooking);

module.exports = router;
