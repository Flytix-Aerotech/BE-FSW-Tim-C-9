const router = require('express').Router();
const {login, register} = require('../controllers/AuthController.js');

// middleware
const auth = require('../middleware/Auth.js');


router.post('/auth/login', login);
router.post('/auth/register', register);
// router.post('/auth/verify', verify);


module.exports = router;