import express from 'express';
import { addToCart, updateCart, deleteFromCart } from '../controller/cartController.js';
import { isAuthenticatedUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-to-cart', isAuthenticatedUser, addToCart);
router.put('/update-cart', isAuthenticatedUser, updateCart);
router.delete('/delete-from-cart', isAuthenticatedUser, deleteFromCart);

export default router;