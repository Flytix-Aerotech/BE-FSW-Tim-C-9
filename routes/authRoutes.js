const router = require("express").Router();
const { login, register, getUsers, getProfile, updateProfile, getUserByEmail, resetPassword, forgotPassword, verifyOTP, activateAccout, sendActivation } = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

// for get all users debugging
router.get("/users", getUsers);

// API
router.post("/login", login);
router.post("/register", upload, register);
router.post("/user", getUserByEmail);
router.put("/reset-password/:username", resetPassword);
router.get("/profile", Auth.verifyUser, Auth.isUser, getProfile);
router.put("/profile", Auth.verifyUser, Auth.isUser, upload, updateProfile);
router.post('/send/email-otp', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.get('/verify/account', Auth.isActive, sendActivation);
router.post('/verify/account', Auth.isActive, activateAccout);

module.exports = router;
