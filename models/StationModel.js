const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  type: { type: String, required: true }, // FeatureCollection
  name: { type: String },
  features: [{
    type: { type: String, required: true }, // Feature
    properties: {
      name: { type: String },
      name_en: { type: String, default: null },
      railway: { type: String, default: null },
      ele: { type: Number, default: null },
      operator_type: { type: String, default: null },
      layer: { type: String, default: null },
      addr_full: { type: String, default: null },
      addr_city: { type: String, default: null },
      source: { type: String, default: null },
      name_si: { type: String, default: null },
      name_ta: { type: String, default: null },
      osm_id: { type: Number, default: null },
      osm_type: { type: String, default: null }
    },
    geometry: {
      type: { type: String, required: true }, // Point
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  }]
});

module.exports = mongoose.model('Station', stationSchema);