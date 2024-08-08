const express = require('express');
const { getAllTrainLocations, getTrainLocation } = require('../controllers/train');


const router = express.Router();

// Route for retrieving all train locations
router.get('/', getAllTrainLocations);

// Route for retrieving a specific train's location
router.get('/:deviceId', getTrainLocation);

module.exports = router;

