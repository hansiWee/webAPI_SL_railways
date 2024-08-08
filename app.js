const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/dbConfig');
const gpsDataRoutes = require('./routes/gpsDataRoutes');
const trainRoutes = require('./routes/trainRoutes');

require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/gps-data', gpsDataRoutes);
app.use('/api/v1/trains', trainRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
  });
});

module.exports = app;
