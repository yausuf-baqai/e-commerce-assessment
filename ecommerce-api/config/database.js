const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Host for your database (e.g., localhost)
    dialect: 'mysql',          // Explicitly specify the dialect (MySQL)
    logging: console.log,      // Enable logging for SQL queries (optional)
  }
);

module.exports = sequelize;
