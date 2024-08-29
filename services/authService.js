const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel'); // Assuming you have a User model

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
};

const authenticateUser = async (username, password) => {
    const user = await UserModel.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        return generateToken(user);
    }
    throw new Error('Invalid credentials');
};

module.exports = { authenticateUser,generateToken };
