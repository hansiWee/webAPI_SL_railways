const GpsData = require('../../models/GpsData'); 

async function getLatestTrainLocation(train_no, currentTime, timeThreshold) {
  const latestData = await GpsData.findOne({
    train_no: train_no,
    timestamp: { $lte: currentTime }
  }).sort({ timestamp: -1 }).exec();

  if (!latestData) {
    throw new Error('No data found for this train.');
  }

  const timeDifference = currentTime - latestData.timestamp;
  
  if (timeDifference <= timeThreshold) {
    return latestData;
  } else {
    throw new Error('Data is outdated.');
  }
}

module.exports = { getLatestTrainLocation };