const Product = require('../models/Product');

// Fetch Products with Filters
exports.getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (minPrice) filters.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) filters.price = { [Op.lte]: parseFloat(maxPrice) };

    const products = await Product.findAll({ where: filters });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add New Product (Admin Only)
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.create({ name, description, price, category });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update({ name, description, price, category });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
