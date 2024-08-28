const GpsData = require('../models/GpsData');
const mongoose = require('mongoose');


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

// Controller method to retrieve real-time location data of all trains with a specific engine_id
const getTrainLocation = async (req, res, next) => {
  try {
    const { engine_id } = req.params;

    // Ensure the database connection is established
    if (!mongoose.connection.readyState) {
      return res.status(500).json({ status: 'error', message: 'Database not connected' });
    }

    // Fetch all GPS data for the specified train_id from trainData.locations collection
    const gpsData = await mongoose.connection.db.collection('trainData').find({ 'locations.train_id': parseInt(engine_id) }).toArray();

    if (!gpsData || gpsData.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Train not found' });
    }

    // Flatten the locations array from the fetched documents
    const locations = gpsData.flatMap(data => data.locations);

    // Filter the locations array to get the specific train_id data
    const filteredData = locations.filter(location => location.train_id.$numberInt === engine_id);

    // Format the data for response
    const formattedData = filteredData.map(data => ({
      locationId: data.location_id,
      trainId: data.train_id.$numberInt,
      timestamp: new Date(data.timestamp.$date.$numberLong),
      latitude: data.latitude.$numberDouble,
      longitude: data.longitude.$numberDouble,
      speed: data.speed.$numberInt,
      direction: data.direction.$numberInt,
    }));

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
  