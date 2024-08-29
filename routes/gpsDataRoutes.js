const express = require('express');
const router = express.Router();
const gpsDataController = require('../controllers/gpsDataController');
const { authenticateToken } = require('../Middleware/authMiddleware');

module.exports = router;

router.post('/gpsData', gpsDataController.publishToRabbitMQ);
router.get('/gpsData/stream', gpsDataController.getSseConnection);
router.delete('/delete-old-data', authenticateToken, gpsDataController.deleteOldData);

module.exports = router;
