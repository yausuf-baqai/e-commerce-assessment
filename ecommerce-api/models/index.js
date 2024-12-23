const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');

const db = {
  User,
  Product,
  Order,
  sequelize,
};

module.exports = db;
