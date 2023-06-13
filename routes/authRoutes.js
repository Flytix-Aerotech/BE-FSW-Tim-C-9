const router = require("express").Router();
const { login, register, getUsers, getProfile, updateProfile, resetPassword} = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

router.post("/auth/login", login);

// test users
router.get("/auth/getusers", getUsers);
router.post("/auth/register", upload, register);
// router.post("/auth/resetpassword", resetPassword);
router.put('/auth/profile', Auth.verifyUser, Auth.isUser, upload, updateProfile);
router.get('/auth/profile', Auth.verifyUser, Auth.isUser, getProfile);

module.exports = router;
