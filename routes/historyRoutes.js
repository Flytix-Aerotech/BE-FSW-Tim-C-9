const router = require('express').Router();
const auth = require('../middleware/Auth');
const HistoryController = require('../controllers/HistoryController');

router.get('', HistoryController.getBooking);
router.get('/:id', HistoryController.getBookingById);

module.exports = router;
