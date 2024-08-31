// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../Middleware/authMiddleware');


// Register a new user
router.post('/register', authController.register);

// login a user
router.post('/login', authController.login);

// Get user details by ID (protected route)
router.get('/user', authenticateToken, authController.getUserDetails);

module.exports = router;
