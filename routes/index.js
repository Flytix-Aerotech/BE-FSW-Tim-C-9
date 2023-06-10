const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const router = express.Router();
const passengerRoutes = require("./bookingRoutes");
const bookingRoutes = require("./bookingRoutes");

//API routes => dokumentasi API
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

// // API Auth Login
router.use("/api/v1/", authRoutes);
router.use("/api/v1/passengers", passengerRoutes);
router.use("/api/v1/bookings", bookingRoutes);

// router.get('/user',authenticate,user)

// Dashboard
module.exports = router;
