const router = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const historyRoutes = require('./historyRoutes');
const paymentRoutes = require('./paymentRoutes');

//Open API
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API
router.use('/api/v1', authRoutes)
router.use('/api/v1/booking', bookRoutes);
router.use('/api/v1/histories', historyRoutes);
router.use('/api/v1/payment', paymentRoutes);

module.exports = router
