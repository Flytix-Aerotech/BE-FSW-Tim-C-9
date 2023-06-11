const router = require("express").Router();
const authRoutes = require("./authRoutes");

router.use("/api/v1", authRoutes);

module.exports = router;
