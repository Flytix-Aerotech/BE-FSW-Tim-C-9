const router = require('express').Router();
const auth = require('../middleware/Auth');
const { continuePayment, paymentDeadline } = require('../middleware/continuePayment');
const { payTransaction, addTransaction } = require('../controllers/TransactionController');

router.post('', addTransaction);
router.get('/:code', paymentDeadline, payTransaction);

module.exports = router;
