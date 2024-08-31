const Station = require('../../models/StationModel');

const getStations = async () => {
  try {
    const station = await Station.aggregate([
      { $unwind: "$features" },
      { $match: { "features.properties.railway": "station" } },
      { $project: { _id: 0, features: 1 } }
    ]);
    console.log('Fetched stations:', station);
    return station;
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
};

module.exports = {
  getStations,
};