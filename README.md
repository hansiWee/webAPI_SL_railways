# WEBAPI_SL_RAILWAYS

## Overview

**WEBAPI_SL_RAILWAYS** is a Node.js-based API for tracking train locations in Sri Lanka in real-time. It features real-time updates using Server-Sent Events (SSE), integration with a MongoDB database, and RabbitMQ for messaging. This project is built with an MVM architecture and uses the Leaflet library for map visualizations in the frontend.

## Features

- Real-time train location tracking using SSE.
- Integration with MongoDB for data storage.
- RabbitMQ for messaging between services.
- Middleware for authentication.
- Modular architecture following MVM principles.
- Custom utilities for scheduling tasks (cron jobs).

## Project Structure

```plaintext
WEBAPI_SL_RAILWAYS/
├── controllers/
│   ├── Middleware/
│   │   └── authMiddleware.js     # Handles authentication logic
├── models/
│   ├── GpsData.js                # Model for GPS data
│   ├── StationModel.js           # Model for railway stations
│   └── UserModel.js              # Model for user data
├── routes/
│   ├── authRoutes.js             # Routes for authentication
│   ├── gpsDataRoutes.js          # Routes for GPS data handling
│   └── trainDetails.js           # Routes for train details
├── services/
│   ├── trainDetails/
│   │   ├── currentLocationServices.js # Service for current train locations
│   │   ├── StationModelService.js     # Service for station-related logic
│   │   └── trainStatusService.js      # Service for train status management
│   ├── authService.js                # Service for user authentication
│   └── gpsDataServices.js            # Service for GPS data management
├── utils/
│   ├── cronJobs.js                  # Utility for scheduling tasks
│   └── rabbitmq.js                  # RabbitMQ configuration and setup
├── .env                             # Environment variables
├── .gitignore                       # Ignored files for Git
└── APIs for project.pdf             # Documentation for API endpoints

Data generator git Repo: https://github.com/hansiWee/dataGenerator
