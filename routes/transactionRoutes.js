const router = require('express').Router();
const auth = require('../middleware/Auth');
const TransactionController = require('../controllers/TransactionController');

router.post('', TransactionController.addTransaction);
router.get('/:code', (req, res) => {
    const book = req.body;
    if(!book.seat_id && !payment.status_payment){
      return res.status(400).json({ msg: error.message });
    } else {
        TransactionController.payTransaction(req, res);
    }
  });


module.exports = router;
