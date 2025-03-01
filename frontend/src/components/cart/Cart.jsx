import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { getCart, updateCartItem, removeFromCart } from '../../services/cartService';
import { toast } from 'react-toastify';

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({
        items: [
            {
                id: 1,
                name: 'Ocean Rush Car Freshener',
                price: 455.00,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539',
            },
            {
                id: 2,
                name: 'Sahara Oud Premium Perfume',
                price: 899.00,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
            },
        ],
        subtotal: 1809.00,
        shipping: 100.00,
        tax: 181.00,
        total: 2090.00,
    });

    // Fetch cart data from API
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await getCart();
            if (response.success && response.cart) {
                // Transform the cart data to match our component structure
                const transformedCart = {
                    items: response.cart.cartItem.map(item => ({
                        id: item.productId._id,
                        name: item.productId.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.productId.images[0]?.url || 'https://via.placeholder.com/150',
                    })),
                    subtotal: response.cart.totalPrice,
                    shipping: 100.00, // This could be dynamic based on backend logic
                    tax: response.cart.totalPrice * 0.1, // Assuming 10% tax
                    total: response.cart.totalPriceAfterDiscount || response.cart.totalPrice + 100.00 + (response.cart.totalPrice * 0.1),
                };
                setCart(transformedCart);
            } else {
                // If no cart exists yet, set empty cart
                setCart({
                    items: [],
                    subtotal: 0,
                    shipping: 0,
                    tax: 0,
                    total: 0,
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch cart');
            toast.error(err.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId, change) => {
        try {
            const item = cart.items.find(item => item.id === itemId);
            if (!item) return;
            
            const newQuantity = item.quantity + change;
            if (newQuantity < 1) return;
            
            // Optimistically update UI
            const updatedItems = cart.items.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
            
            const updatedSubtotal = updatedItems.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );
            
            const updatedTax = updatedSubtotal * 0.1; // Assuming 10% tax
            
            setCart({
                ...cart,
                items: updatedItems,
                subtotal: updatedSubtotal,
                tax: updatedTax,
                total: updatedSubtotal + cart.shipping + updatedTax
            });
            
            // Call API to update cart
            await updateCartItem(itemId, newQuantity);
        } catch (err) {
            toast.error(err.message || 'Failed to update item quantity');
            // Revert to original state on error
            fetchCart();
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            // Optimistically update UI
            const updatedItems = cart.items.filter(item => item.id !== itemId);
            
            const updatedSubtotal = updatedItems.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );
            
            const updatedTax = updatedSubtotal * 0.1; // Assuming 10% tax
            
            setCart({
                ...cart,
                items: updatedItems,
                subtotal: updatedSubtotal,
                tax: updatedTax,
                total: updatedSubtotal + cart.shipping + updatedTax
            });
            
            // Call API to remove item
            await removeFromCart(itemId);
            toast.success('Item removed from cart');
        } catch (err) {
            toast.error(err.message || 'Failed to remove item');
            // Revert to original state on error
            fetchCart();
        }
    };

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[100px] mb-16">
            <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
            
            {loading ? (
                <div className="text-center py-16">
                    <p className="text-gray-600">Loading your cart...</p>
                </div>
            ) : error ? (
                <div className="text-center py-16">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={fetchCart}
                        className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            ) : cart.items.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/products"
                        className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-white rounded-xl shadow-sm"
                            >
                                <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-gray-600 mt-1">₹{item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <FiMinus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-2 text-gray-900 font-medium border-x-2 border-gray-200">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                        >
                                            <FiPlus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{cart.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹{cart.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>₹{cart.tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between font-medium text-lg">
                                        <span>Total</span>
                                        <span>₹{cart.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button onClick={() => navigate("/checkout")} className=" cursor-pointer w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors mt-6">
                                    Proceed to Checkout
                                </button>
                                <Link
                                    to="/products"
                                    className="block text-center text-gray-600 hover:text-gray-900 transition-colors mt-4"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;