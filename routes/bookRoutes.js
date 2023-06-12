const router = require('express').Router();
const auth = require('../middleware/Auth');
const {
    getBook,
    booksUser,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
} = require('../controllers/BookController');


router.get('', auth, getBook);
router.get('/user', auth, booksUser);
router.get('/:id', auth, getBookById);
router.post('', auth, addBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;
