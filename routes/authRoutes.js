const router = require("express").Router();
const { login, register, getUsers, forgotPassword, verifyOTP } = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

router.post("/auth/login", login);

// test users
router.get("/auth/getusers", getUsers);
router.post("/auth/register", upload, register);
router.post('/send/email-otp', forgotPassword);
router.post('/verify-otp', verifyOTP);

module.exports = router;
