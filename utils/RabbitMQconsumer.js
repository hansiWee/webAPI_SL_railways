const amqp = require('amqplib/callback_api');
const GpsDataService = require('../services/gpsDataServices');

let gpsDataArray = [];

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        const queue = 'gpsDataQueue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const gpsData = JSON.parse(msg.content.toString());
                console.log('Received GPS data:', gpsData);

                // Store data in the in-memory array
                gpsDataArray.push(gpsData);

                // Acknowledge the message
                channel.ack(msg);
            }
        }, {
            noAck: false
        });
    });
});
module.exports = gpsDataArray;