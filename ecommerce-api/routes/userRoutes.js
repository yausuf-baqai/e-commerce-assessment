const express = require('express');
const {
  registerUser,
  loginUser,
  getAllCustomers,
  getCustomerById,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for role checks
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/customers', authMiddleware('admin'), getAllCustomers);
router.get('/customers/:id', authMiddleware('admin'), getCustomerById);

module.exports = router;
