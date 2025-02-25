import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controller/productController.js';
import { uploadMultipleImages, handleMulterError } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get('/', getAllProducts);

// Get single product by ID
router.get('/:id', getProductById);

// Protected routes
router.post('/', protect, uploadMultipleImages, handleMulterError, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;