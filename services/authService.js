const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models/userModel');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const registerUser = async (name, email, password, role) => {
    const existingUser = await db.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.insert({ name, email, password: hashedPassword, role: role || 'member' });
};

const loginUser = async (email, password) => {
    const user = await db.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    return { user, token: generateToken(user), refreshToken: generateRefreshToken(user) };
};

const getCurrentUser = async (userId) => {
    return await db.findOne({ _id: userId });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    generateToken
};
