import OrderModel from "../model/order.model.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { AppError } from "../utils/ApiError.js";
import ProductModel from "../model/product.model.js";

// Create a new order
export const createOrder = catchAsyncError(async (req, res, next) => {
    const { orderItems, shippingAddress, paymentInfo } = req.body;

    // Calculate prices
    let itemsPrice = 0;
    for (const item of orderItems) {
        const product = await ProductModel.findById(item.product);
        if (!product) {
            return next(new AppError(`Product not found with id: ${item.product}`, 404));
        }
        if (product.quantity < item.quantity) {
            return next(new AppError(`Insufficient stock for product: ${product.title}`, 400));
        }
        itemsPrice += product.price * item.quantity;

        // Update product quantity
        product.quantity -= item.quantity;
        await product.save();
    }

    const taxPrice = itemsPrice * 0.15; // 15% tax
    const shippingPrice = itemsPrice > 200 ? 0 : 30; // Free shipping over $200

    const order = await OrderModel.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice: itemsPrice + taxPrice + shippingPrice
    });

    res.status(201).json({
        success: true,
        order
    });
});

// Get single order
export const getOrderById = catchAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id)
        .populate('user', 'FirstName LastName Email')
        .populate('orderItems.product', 'title price');

    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get logged in user orders
export const myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await OrderModel.find({ user: req.user._id })
        .populate('orderItems.product', 'title price');

    res.status(200).json({
        success: true,
        orders
    });
});

// Get all orders -- Admin
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await OrderModel.find()
        .populate('user', 'FirstName LastName Email')
        .populate('orderItems.product', 'title price');

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update order status -- Admin
export const updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    if (order.orderStatus === 'DELIVERED') {
        return next(new AppError('You have already delivered this order', 400));
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'DELIVERED') {
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
        success: true,
        order
    });
});

// Delete Order -- Admin
export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    });
});