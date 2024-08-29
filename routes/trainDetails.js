const express = require('express');
//const { getAllTrainLocations, getTrainLocation, getTrainHistory } = require('../controllers/train');
const trainStatus = require('../controllers/trainDetails/trainStatusController');
const trainLocationController = require('../controllers/trainDetails/currentLocationController');
const stationController = require('../controllers/trainDetails/stationModelController');


const router = express.Router();

router.get('/status/:train_no', trainStatus.getTrainStatus);
router.get('/location/:train_no', trainLocationController.getTrainLocation);
router.get('/station/:name', stationController.getTrainsNearStation);




module.exports = router;

