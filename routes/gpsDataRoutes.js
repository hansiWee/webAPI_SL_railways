const express = require('express');
const { ingestGpsData } = require('../controllers/gpsDataController');

const router = express.Router();

router.post('/', ingestGpsData);

module.exports = router;
