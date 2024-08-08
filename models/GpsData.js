const mongoose = require('mongoose');

const gpsDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
});

const GpsData = mongoose.model('GpsData', gpsDataSchema);

module.exports = GpsData;
