import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../../services/cartService';

// Async thunks
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCart();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItem',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            // Ensure productId is passed as a string, not an object
            const response = await addToCart({
                productId: productId.toString(),
                quantity: parseInt(quantity)
            });
            toast.success('Item added to cart');
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add item to cart');
            return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
        }
    }
);

export const updateItem = createAsyncThunk(
    'cart/updateItem',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await updateCartItem(productId, quantity);
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update item');
            return rejectWithValue(error.response?.data?.message || 'Failed to update item');
        }
    }
);

export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await removeFromCart(productId);
            toast.success('Item removed from cart');
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove item');
            return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        subtotal: 0,
        shipping: 100,
        tax: 0,
        total: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success && action.payload.cart) {
                    const cart = action.payload.cart;
                    state.items = cart.cartItem.map(item => ({
                        id: item.productId._id,
                        name: item.productId.title,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.productId.images[0]
                    }));
                    state.subtotal = cart.totalPrice;
                    state.tax = cart.totalPrice * 0.1; // 10% tax
                    state.total = cart.totalPriceAfterDiscount || cart.totalPrice + state.shipping + state.tax;
                } else {
                    state.items = [];
                    state.subtotal = 0;
                    state.tax = 0;
                    state.total = 0;
                }
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Item to Cart
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                // Refresh cart data
                if (action.payload.success && action.payload.cart) {
                    const cart = action.payload.cart;
                    state.items = cart.cartItem.map(item => ({
                        id: item.productId._id,
                        name: item.productId.title,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.productId.images[0]
                    }));
                    state.subtotal = cart.totalPrice;
                    state.tax = cart.totalPrice * 0.1;
                    state.total = cart.totalPriceAfterDiscount || cart.totalPrice + state.shipping + state.tax;
                }
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Cart Item
            .addCase(updateItem.fulfilled, (state, action) => {
                if (action.payload.success && action.payload.cart) {
                    const cart = action.payload.cart;
                    state.items = cart.cartItem.map(item => ({
                        id: item.productId._id,
                        name: item.productId.title,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.productId.images[0]
                    }));
                    state.subtotal = cart.totalPrice;
                    state.tax = cart.totalPrice * 0.1;
                    state.total = cart.totalPriceAfterDiscount || cart.totalPrice + state.shipping + state.tax;
                }
            })
            // Remove Cart Item
            .addCase(removeItem.fulfilled, (state, action) => {
                if (action.payload.success && action.payload.cart) {
                    const cart = action.payload.cart;
                    state.items = cart.cartItem.map(item => ({
                        id: item.productId._id,
                        name: item.productId.title,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.productId.images[0]
                    }));
                    state.subtotal = cart.totalPrice;
                    state.tax = cart.totalPrice * 0.1;
                    state.total = cart.totalPriceAfterDiscount || cart.totalPrice + state.shipping + state.tax;
                }
            })
    }
});

export default cartSlice.reducer;