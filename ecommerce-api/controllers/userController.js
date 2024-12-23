const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
require('dotenv').config();

// Register a New User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch All Customers (Admin Only)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.findAll({ where: { role: 'customer' } });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a Customer by ID (Admin Only)
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await User.findOne({ where: { id, role: 'customer' } });

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};