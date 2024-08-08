const GpsData = require('../models/GpsData');


// Controller method to retrieve real-time location data of all trains
const getAllTrainLocations = async (req, res, next) => {
  try {
    // Fetch all documents from the GpsData collection
    const gpsData = await GpsData.find().select('trainId latitude longitude speed timestamp');
    
    // Format the data for response
    const formattedData = gpsData.map(data => ({
      trainId: data.trainId,
      latitude: data.latitude,
      longitude: data.longitude,
      speed: data.speed,
      lastUpdated: data.timestamp.toISOString(),  // Convert timestamp to ISO 8601 string
    }));

    // Send response
    res.status(200).json(formattedData);
  } catch (error) {
    next(error);  // Pass error to the error handling middleware
  }
};

// Controller method to retrieve real-time location data for a specific train
const getTrainLocation = async (req, res, next) => {
  try {
    const { deviceId } = req.params;

    // Fetch the latest GPS data for the specified trainId
    const gpsData = await GpsData.findOne({deviceId }).sort({ timestamp: -1 });

    if (!gpsData) {
      return res.status(404).json({ status: 'error', message: 'Train not found' });
    }

    // Format the data for response
    const formattedData = {
      trainId: gpsData.trainId,
      latitude: gpsData.latitude,
      longitude: gpsData.longitude,
      speed: gpsData.speed,
      lastUpdated: gpsData.timestamp.toISOString(),  // Convert timestamp to ISO 8601 string
    };

    // Send response
    res.status(200).json(formattedData);
  } catch (error) {
    next(error);  // Pass error to the error handling middleware
  }
};


// Controller method to retrieve historical location data for a specific train
const getTrainHistory = async (req, res, next) => {
  try {
    const { deviceId } = req.params;

    // Calculate the date 90 days ago from today
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Fetch GPS data for the specified trainId from the last 90 days
    const gpsData = await GpsData.find({
        deviceId,
        timestamp: { $gte: ninetyDaysAgo },
    }).sort({ timestamp: 1 });  // Sort by timestamp ascending

    if (gpsData.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No historical data found for this train' });
    }

    // Format the data for response
    const formattedData = gpsData.map(data => ({
      timestamp: data.timestamp.toISOString(),
      latitude: data.latitude,
      longitude: data.longitude,
      speed: data.speed,
    }));

    // Send response
    res.status(200).json(formattedData);
  } catch (error) {
    next(error);  // Pass error to the error handling middleware
  }
};

module.exports = {
    getTrainLocation,
    getAllTrainLocations,
    getTrainHistory
  };
  