const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/products', getProducts);
router.post('/products', authMiddleware('admin'), addProduct);
router.put('/products/:id', authMiddleware('admin'), updateProduct);
router.delete('/products/:id', authMiddleware('admin'), deleteProduct);

module.exports = router;
