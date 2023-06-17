const router = require("express").Router();
const { login, register, getUsers, getProfile, updateProfile, getUserByEmail, resetPassword } = require("../controllers/AuthController.js");

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

module.exports = router;
