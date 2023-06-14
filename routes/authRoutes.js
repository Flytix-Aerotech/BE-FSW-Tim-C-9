const router = require("express").Router();
const { login, register, getUsers, getProfile, updateProfile} = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

// API
router.post("/auth/login", login);
router.post("/auth/register", upload, register);
router.get("/auth/getusers", getUsers);
router.get('/auth/profile', Auth.verifyUser, Auth.isUser, getProfile);
router.put('/auth/profile', Auth.verifyUser, Auth.isUser, upload, updateProfile);


module.exports = router;
