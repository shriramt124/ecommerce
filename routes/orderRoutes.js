import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import {
    createOrder,
    getOrderById,
    myOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from '../controller/orderController.js';

const router = express.Router();

// User routes
router.post('/create', protect, createOrder);
router.get('/me', protect, myOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/', protect, isAdmin, getAllOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);
router.delete('/:id', protect, isAdmin, deleteOrder);

export default router;