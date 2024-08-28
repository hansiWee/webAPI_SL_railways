const amqp = require('amqplib/callback_api');
const axios = require('axios');
const GpsData = require('../models/GpsData'); // Adjust the path as necessary

const queueName = 'train_location_queue';

function connectRabbitMQ() {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            return console.error('Failed to connect to RabbitMQ:', error0);
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                return console.error('Failed to create a channel:', error1);
            }

            channel.assertQueue(queueName, {
                durable: true
            });

            console.log(`Waiting for messages in ${queueName}.`);

            channel.consume(queueName, async (msg) => {
                if (msg !== null) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        console.log("Received:", message);

                        // Save the GPS data to MongoDB
                        const newGpsData = new GpsData(message);
                        await newGpsData.save();
                        console.log('GPS data saved:', newGpsData);

                        const response = await axios.post('http://localhost:5000/api/gpsData', message);
                        console.log('Data sent to API:', response.status, response.data);

                        // Acknowledge the message
                        channel.ack(msg);
                    } catch (error) {
                        console.error('Error processing message:', error.message);
                        if (error.response) {
                            console.error('Response data:', error.response.data);
                            console.error('Response status:', error.response.status);
                            console.error('Response headers:', error.response.headers);
                        }
                    }
                }
            }, {
                noAck: false
            });
        });
    });
}

module.exports = { connectRabbitMQ };

// Start the RabbitMQ connection
connectRabbitMQ();