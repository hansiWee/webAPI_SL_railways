// rabbitmq.js
const amqp = require('amqplib/callback_api');
const gpsDataService = require('../services/gpsDataServices');

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

            channel.assertQueue(queueName, { durable: true });

            console.log(`Waiting for messages in ${queueName}.`);

            channel.consume(queueName, async (msg) => {
                if (msg !== null) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        console.log("Received:", message);

                        // Use the service to handle saving and broadcasting data
                        await gpsDataService.saveGpsData(message);

                        channel.ack(msg);
                    } catch (error) {
                        console.error('Error processing message:', error.message);
                    }
                }
            }, { noAck: false });
        });
    });
}

connectRabbitMQ();
module.exports = { connectRabbitMQ };
