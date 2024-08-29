// services/gpsDataService.js
const GpsData = require('../models/GpsData');

const clients = [];

// Manages SSE clients
function addClient(res) {
    clients.push(res);
    res.on('close', () => {
        removeClient(res);
    });
}

function removeClient(res) {
    const index = clients.indexOf(res);
    if (index !== -1) {
        clients.splice(index, 1);
    }
}

function sendToAllClients(data) {
    clients.forEach(res => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

async function saveGpsData(data) {
    try {

        sendToAllClients(data);
        const gpsData = new GpsData(data);
        await gpsData.save();
        // Broadcast the saved data to all SSE clients
        return gpsData;
    } catch (error) {
        console.error('Error saving GPS data:', error);
        throw new Error('Error saving GPS data');
    }
}

const deleteOldData = async () => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    try {
        const result = await DataModel.deleteMany({ createdAt: { $lt: ninetyDaysAgo } });
        return result.deletedCount; // Return the count of deleted records
    } catch (error) {
        throw new Error(`Failed to delete old data: ${error.message}`);
    }
}

module.exports = {
    saveGpsData,
    addClient,
    deleteOldData
};
