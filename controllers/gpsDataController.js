const GpsData = require('../models/GpsData');

const ingestGpsData = async (req, res, next) => {
  try {
    const { deviceId, timestamp, latitude, longitude, speed } = req.body;

    const newGpsData = new GpsData({
      deviceId,
      timestamp: new Date(timestamp),
      latitude,
      longitude,
      speed,
    });

    await newGpsData.save();

    res.status(201).json({
      status: 'success',
      message: 'Data ingested successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ingestGpsData,
};
