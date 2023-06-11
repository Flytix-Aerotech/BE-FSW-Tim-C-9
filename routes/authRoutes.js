const router = require("express").Router();
const { login, register } = require("../controllers/AuthController.js");

// middleware
const Auth = require("../middleware/Auth.js");
const upload = require("../middleware/uploader.js");

router.post("/auth/login", login);
router.post("/auth/register", upload, register);

module.exports = router;