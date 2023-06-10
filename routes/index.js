const express = require('express');

const router = express.Router();
const authRoutes = require('./authRoutes');

router.use('/api/v1', authRoutes)


module.exports = router