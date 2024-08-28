const { GpsData } = require('../modules/gpsdata');

// Function to update train information
const updateTrainInfo = (trainId, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedTrain = await GpsData.findOneAndUpdate({ train_id: trainId }, updateData, { new: true });
            if (updatedTrain) {
                resolve({ message: 'Train information updated successfully', data: updatedTrain });
            } else {
                reject(new Error('Train not found'));
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    updateTrainInfo,
};
