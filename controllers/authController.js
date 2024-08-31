
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 
exports.login = async (req, res) => {
  try {
      const { username, password } = req.body;
      const token = await authService.authenticateUser(username, password);
      console.log(token);
      // Store the logged-in username
      loggedInUsername = username;

      res.status(200).json({ message: 'User logged in successfully' , token});
  } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
  }
};

exports.register = async (req, res) => {
    const { username, password, role,email } = req.body;
  
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new UserModel({ username, password, role , email});
      await newUser.save();

      // Generate a token for the new user
    const token = authService.generateToken(newUser);
  
      // Respond with success message
      res.status(200).json({ message: 'User registered successfully',token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.getUserDetails = async (req, res) => {
    try {
        // Use the logged-in username
        const username = loggedInUsername;

        if (!username) {
            return res.status(400).json({ error: 'No user is logged in' });
        }

        // Find the user by username
        const user = await UserModel.findOne({ username }).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with user details
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

