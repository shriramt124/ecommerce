import cartModel from '../model/cart.model.js';
import ProductModel from '../model/product.model.js';
import { catchAsyncError } from '../utils/catchAsyncErrors.js';
import { AppError } from '../utils/ApiError.js';

export const addToCart = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await ProductModel.findById(productId);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    // Add stock validation
    if (product.quantity < quantity) {
        return next(new AppError(`Only ${product.quantity} items available in stock`, 400));
    }

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
        const cartItem = {
            productId,
            quantity,
            price: product.price,
            totalProductDiscount: 0,
        };
        cart = await cartModel.create({
            userId,
            cartItem: [cartItem],
            totalPrice: product.price * quantity,
            totalPriceAfterDiscount: product.price * quantity,
            discount: 0,
        });
    } else {
        let productExists = false;
        cart.cartItem.forEach((item) => {
            if (item.productId.toString() === productId) {
                item.quantity += quantity;
                item.price = product.price;
                item.totalProductDiscount = 0;
                productExists = true;
            }
        });

        if (!productExists) {
            const cartItem = {
                productId,
                quantity,
                price: product.price,
                totalProductDiscount: 0,
            };
            cart.cartItem.push(cartItem);
        }

        cart.totalPrice = cart.cartItem.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        cart.totalPriceAfterDiscount = cart.totalPrice;
        cart.discount = 0;

        await cart.save();
    }

    res.status(200).json({ message: 'Product added to cart', cart });
});

export const updateCart = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await ProductModel.findById(productId); // Fetch the product information
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    let productExists = false;
    cart.cartItem.forEach((item, index) => {
        if (item.productId.toString() === productId) {
            item.quantity = quantity;
            item.price = product.price; // Use the fetched product price
            item.totalProductDiscount = 0;
            productExists = true;
        }
    });

    if (!productExists) {
        return next(new AppError('Product not found in cart', 404));
    }

    cart.totalPrice = cart.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    cart.totalPriceAfterDiscount = cart.totalPrice;
    cart.discount = 0;

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
});

export const deleteFromCart = catchAsyncError(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    let productExists = false;
    cart.cartItem = cart.cartItem.filter((item) => {
        if (item.productId.toString() === productId) {
            productExists = true;
            return false;
        }
        return true;
    });

    if (!productExists) {
        return next(new AppError('Product not found in cart', 404));
    }

    cart.totalPrice = cart.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    cart.totalPriceAfterDiscount = cart.totalPrice;
    cart.discount = 0;

    await cart.save();
    res.status(200).json({ message: 'Product deleted from cart', cart });
});
export const getCart = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;

    const cart = await cartModel.findOne({ userId }).populate('cartItem.productId');
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    res.status(200).json({
        success: true,
        cart
    });
});