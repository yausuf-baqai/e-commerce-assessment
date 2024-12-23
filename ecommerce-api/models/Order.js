const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  userId: DataTypes.INTEGER,
  status: DataTypes.STRING,
});

const OrderItem = sequelize.define('OrderItem', {
  orderId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
});

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = { Order, OrderItem };
