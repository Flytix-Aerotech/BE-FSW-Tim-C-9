const router = require('express').Router();
const auth = require('../middleware/Auth');
const BookController = require('../controllers/BookController');

router.post('', BookController.addBooking);
router.delete('/:id', BookController.deleteBooking);

module.exports = router;
