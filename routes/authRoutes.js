const router = require("express").Router();
const { login, register, getUsers, getProfile, updateProfile, getUserByEmail, resetPassword } = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

// for get all users debugging
router.get("/auth/users", getUsers);

// API
router.post("/auth/login", login);
router.post("/auth/register", upload, register);
router.post("/auth/user", getUserByEmail);
router.put("/auth/reset-password/:email", resetPassword);
router.get("/auth/profile", Auth.verifyUser, Auth.isUser, getProfile);
router.put("/auth/profile", Auth.verifyUser, Auth.isUser, upload, updateProfile);

module.exports = router;
