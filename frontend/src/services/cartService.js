import axios from 'axios';

const API_URL = 'http://localhost:3000/cart';

// Configure axios to include credentials with every request
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Get cart items
export const getCart = async () => {
  try {
    const response = await api.get('/get-cart');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch cart' };
  }
};

// Add item to cart
export const addToCart = async ({ productId, quantity }) => {
  try {
    const response = await api.post('/add-to-cart', {
      productId: productId.toString(),
      quantity: parseInt(quantity)
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add item to cart' };
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put('/update-cart', {
      productId: productId.toString(),
      quantity: parseInt(quantity)
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update cart item' };
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete('/delete-from-cart', {
      data: { productId: productId.toString() }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to remove item from cart' };
  }
};