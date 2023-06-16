const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const authRoutes = require("./authRoutes");
const passengerRoutes = require("./passengerRoutes");
const airportRoutes = require("./airportRoutes");

//Open API
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API
router.use("/api/v1", authRoutes);
router.use("/api/v1", passengerRoutes);
router.use("/api/v1", airportRoutes);

module.exports = router;
