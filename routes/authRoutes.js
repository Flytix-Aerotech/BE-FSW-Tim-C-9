const router = require("express").Router();
const {
  login,
  register,
  getUsers,
  getProfile,
  updateProfile,
  resetPassword,
  forgotPassword,
  verifyOTP,
  verifyAccount,
} = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

// for get all users debugging
router.get("/users", getUsers);

// API
router.post("/login", login);
router.post("/register", upload, register);
router.put("/reset-password/:email", resetPassword);
router.get("/profile", Auth.verifyUser, Auth.isUser, getProfile);
router.put("/profile", Auth.verifyUser, Auth.isUser, upload, updateProfile);
router.post("/send/email-otp", forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/verify-account/:email", verifyAccount);

module.exports = router;
