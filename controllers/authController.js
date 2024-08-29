
const authService = require('../services/authService');
const UserModel = require('../models/UserModel');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.authenticateUser(username, password);
        res.status(200).json({message: 'User logged in successfully' });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
  
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
      const newUser = new UserModel({ username, password, role });
      await newUser.save();

      // Generate a token for the new user
    const token = authService.generateToken(newUser);
  
      // Respond with success message
      res.status(201).json({ message: 'User registered successfully',token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.getUserDetails = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user by ID
      const user = await UserModel.findById(userId).select('-password'); // Exclude password from response
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Respond with user details
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


