const cron = require('node-cron');
const axios = require('axios');

// Schedule a task to run every day at midnight

cron.schedule('0 0 * * *', async () => {
    try {
        await axios.delete('http://localhost:5000/api/delete-old-data');
        console.log('Deleted old data successfully');
    } catch (error) {
        console.error('Error deleting old data:', error.message);
    }
});
