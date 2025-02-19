import express from 'express';
import { addToCart, updateCart, deleteFromCart, getCart } from '../controller/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get user's cart
router.get('/get-cart', protect, getCart);

// Cart operations
router.post('/add-to-cart', protect, addToCart);
router.put('/update-cart', protect, updateCart);
router.delete('/delete-from-cart', protect, deleteFromCart);

export default router;