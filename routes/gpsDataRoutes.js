const express = require('express');
const router = express.Router();
const gpsDataController = require('../controllers/gpsDataController');

// Route to handle incoming GPS data
router.post('/gpsData', gpsDataController.createGpsData);
// Route to get GPS data by train ID
router.get('/gpsData', gpsDataController.getAllGpsData);


module.exports = router;
