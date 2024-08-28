const mongoose = require('mongoose');

const gpsDataSchema = new mongoose.Schema({
  train_no: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  speed: { type: Number, required: true },
  signal_strength: { type: Number, required: true }
});

const GpsData = mongoose.model('GpsData', gpsDataSchema);

module.exports = GpsData;