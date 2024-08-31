const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel'); // Assuming you have a User model

const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (user) => {
    return jwt.sign({username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};

const authenticateUser = async (username, password) => {
    const user = await UserModel.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        
        return generateToken(user);
    }
    throw new Error('Invalid credentials');
};

module.exports = { authenticateUser,generateToken };
