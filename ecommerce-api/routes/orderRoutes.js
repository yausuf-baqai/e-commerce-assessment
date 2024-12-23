const express = require('express');
const { getOrders, createOrder, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/orders', authMiddleware('customer'), getOrders);
router.post('/orders', authMiddleware('customer'), createOrder);
router.get('/orders/:id', authMiddleware('customer'), getOrderById);

module.exports = router;
