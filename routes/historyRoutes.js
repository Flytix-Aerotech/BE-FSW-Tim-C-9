const router = require('express').Router();
const auth = require('../middleware/Auth');
const HistoryController = require('../controllers/HistoryController');

router.get('', HistoryController.getBooking);
router.get('/filter', HistoryController.filterBooking);
router.get('/:code', HistoryController.getBookingCode);

module.exports = router;
