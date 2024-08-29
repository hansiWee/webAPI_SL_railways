const gpsDataService = require('../services/gpsDataServices');

async function saveGpsData(req, res) {
    try {
        const gpsData = await gpsDataService.saveGpsData(req.body);
        res.status(201).json({ message: 'GPS data saved successfully', data: gpsData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function publishToRabbitMQ(req, res) {
    const { trainId, latitude, longitude } = req.body;

    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            return res.status(500).json({ error: 'Failed to connect to RabbitMQ' });
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                return res.status(500).json({ error: 'Failed to create a channel' });
            }

            channel.assertQueue(queueName, { durable: true });

            const gpsData = { train_no, latitude, longitude, timestamp,speed ,signal_strength};
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(gpsData)), { persistent: true });

            res.status(200).json({ message: 'GPS data sent to RabbitMQ' });
        });
    });
}

function getSseConnection(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with the client

    // Add this client to the combined service
    gpsDataService.addClient(res);
}

const deleteOldData = async (req, res) => {
    try {
        const deletedCount = await gpsDataService.deleteOldData();
        res.status(200).json({ message: 'Old data deleted', deletedCount });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete old data: ${error.message}` });
    }
};

module.exports = {
    saveGpsData,
    getSseConnection,
    publishToRabbitMQ,
    deleteOldData
};
