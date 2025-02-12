require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'youraccesstokensecret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'yourrefreshtokensecret'
};