import axios from 'axios';

const API_URL = 'http://localhost:3000/orders';

// Configure axios to include credentials with every request
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/create', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create order' };
    }
};

// Get user's orders
export const getMyOrders = async () => {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch orders' };
    }
};

// Get order by ID
export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch order details' };
    }
};

// Track order status
export const trackOrder = async (orderId) => {
    try {
        const response = await api.get(`/${orderId}/track`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to track order' };
    }
};