const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const config = require('../config/config');
const db = require('../models/userModel');
const { validateEmail } = require('../utils/validator');


const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const registerUser = async (name, email, password, role = 'member') => {
    if (!validateEmail(email)) {
        throw { statusCode: 400, message: 'Invalid email format' };
    }
    const existingUser = await db.findOne({ email });
    if (existingUser) {
        throw { statusCode: 409, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.insert({ name, email, password: hashedPassword, role, twoFAEnabled: false });
    return user;
};

const loginUser = async (email, password,twoFACode) => {
    if (!validateEmail(email)) {
        throw { statusCode: 400, message: 'Invalid email format' };
    }
    
    const user = await db.findOne({ email });
    if (!user) {
        throw { statusCode: 401, message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { statusCode: 401, message: 'Invalid email or password' };
    }

    if (user.twoFAEnabled) {
        if (!twoFACode) {
            throw { statusCode: 400, message: '2FA code required' };
        }

        const verified = speakeasy.totp.verify({
            secret: user.twoFASecret,
            encoding: 'base32',
            token: twoFACode
        });

        if (!verified) {
            throw { statusCode: 401, message: 'Invalid 2FA code' };
        }
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { user, token, refreshToken };
};

const getUser = async (userId) => {
    return await db.findOne({ _id: userId });
};



module.exports = {
    registerUser,
    loginUser,
    getUser
};
