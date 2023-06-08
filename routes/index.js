const router = require('express').Router();

const ticketRoutes = require('./ticketRoutes');

router.use('/api/v1/tickets', ticketRoutes)

module.exports = router
