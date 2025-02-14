const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models/userModel');

const ensureAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const adminAuth = (roles = []) => {
    return async (req, res, next) => {
        const user = await db.findOne({ _id: req.user.id });
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { ensureAuth, adminAuth };
