const express = require('express');
const { getAllTrainLocations, getTrainLocation, getTrainHistory } = require('../controllers/train');


const router = express.Router();

// Route for retrieving all train locations
router.get('/', getAllTrainLocations);

// Route for retrieving a specific train's location
router.get('/:engine_id', getTrainLocation);

// Route for retrieving historical location data for a specific train
router.get('/:deviceId/history', getTrainHistory);

module.exports = router;

