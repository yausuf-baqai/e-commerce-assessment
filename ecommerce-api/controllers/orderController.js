const { Order } = require('../models');

// Fetch Orders for Logged-In User
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, include: OrderItem });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create New Order
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; // Expecting [{ productId, quantity }, ...]

    const order = await Order.create({ userId: req.user.id, status: 'pending' });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price, // Calculate or fetch price dynamically
      });
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order Details by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, userId: req.user.id },
      include: OrderItem,
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
