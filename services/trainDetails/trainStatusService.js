const Haversine = require('haversine-distance');
const moment = require('moment');
const GpsData = require('../../models/GpsData');

async function getTodayData(train_no) {
    const todayStart = moment().startOf('day').unix();
    const todayEnd = moment().endOf('day').unix();
    
    return await GpsData.find({
        train_no: train_no,
      timestamp: { $gte: todayStart, $lte: todayEnd }
    }).exec();
  }

function isTrainStopped(gpsData) {
  // Define a small distance threshold (e.g., 10 meters)
  const distanceThreshold = 10; // in meters
  
  for (let i = 1; i < gpsData.length; i++) {
    const prev = gpsData[i - 1];
    const current = gpsData[i];
    
    const distance = Haversine(
      { lat: prev.latitude, lng: prev.longitude },
      { lat: current.latitude, lng: current.longitude }
    );
    
    if (distance > distanceThreshold) {
      return false; // Train is moving
    }
  }
  return true; // Train is stopped
}

async function checkTrainStatus(train_no) {
    const data = await getTodayData(train_no);
    if (data.length === 0) {
        return 'No data for today.';
    }
    
    const isStopped = isTrainStopped(data);
    
    return isStopped ? 'stopped' : 'moving';
}

module.exports = { checkTrainStatus };
  