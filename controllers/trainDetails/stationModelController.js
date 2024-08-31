const stationService = require('../../services/trainDetails/StationModelService');

const getStations = async (req, res) => {
  try {
    const station = await stationService.getStations();
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStations,
};