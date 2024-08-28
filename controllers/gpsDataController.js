const gpsDataArray = require('../utils/RabbitMQconsumer');
const GpsDataService = require('../services/gpsDataServices');

// Function to handle incoming GPS data
exports.createGpsData = async (req, res) => {
    try {
        // Save all GPS data from the in-memory array to the database
        for (const gpsData of gpsDataArray) {
            await GpsDataService.saveGpsData(gpsData);
        }
        // Clear the in-memory array after saving to the database
        //gpsDataArray.length = 0;
        res.status(201).json({ message: 'GPS data created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Function to get all GPS data
exports.getAllGpsData = async (req, res) => {
    try {
        // Send all GPS data from the in-memory array to the frontend
        console.log('Sending GPS data:', gpsDataArray);
        res.json(gpsDataArray);
        gpsDataArray.length = 0;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};