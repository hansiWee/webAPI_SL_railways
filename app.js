const express = require('express');
const morgan = require('morgan');
const { connectRabbitMQ } = require('./utils/rabbitmq');
const connectDB = require('./config/dbConfig');
const gpsDataRoutes = require('./routes/gpsDataRoutes');
const trainDetails = require('./routes/trainDetails');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

require('./utils/cronJobs');

require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
//app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api', gpsDataRoutes);
app.use('/api/v1/train', trainDetails );
app.use('/api/auth', authRoutes);


// Start RabbitMQ consumer
connectRabbitMQ('train_tracking');


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
  });
});

module.exports = app;
