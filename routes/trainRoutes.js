const express = require('express');
const { getAllTrainLocations } = require('../controllers/train');

const router = express.Router();

// Route for retrieving all train locations
router.get('/', getAllTrainLocations);

module.exports = router;
