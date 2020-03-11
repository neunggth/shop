const dotenv = require('dotenv').config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_PORT: process.env.NODE_PORT,
    DOMAIN: process.env.DOMAIN

}