const moment = require('moment');
const { getLatestTrainLocation } = require('../../services/trainDetails/currentLocationServices');

exports.getTrainLocation = async (req, res) => {
  const { train_no } = req.params;
  const currentTime = moment().unix(); // Current time in seconds since Unix epoch
  const timeThreshold = 5 * 60; // 5 minutes threshold in seconds

  try {
    const location = await getLatestTrainLocation(train_no, currentTime, timeThreshold);
    res.status(200).json({ location });
  } catch (error) {
    console.error('Error getting train location:', error);
    res.status(500).json({ error: error.message });
  }
};