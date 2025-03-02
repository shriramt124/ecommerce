import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

// Async thunks for API calls
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters) => {
    const { category, minPrice, maxPrice, search, sort = '-createdAt', page = 1, limit = 12, availability, priceRange } = filters || {};
    const queryParams = new URLSearchParams();

    if (category) queryParams.append('category', category);
    if (availability) queryParams.append('availability', availability);

    // Handle price range filter
    if (priceRange) {
        const [min, max] = priceRange.split('-');
        if (min) queryParams.append('minPrice', min);
        if (max && max !== '+') queryParams.append('maxPrice', max);
        else if (min && max === '+') queryParams.append('minPrice', min);
    } else {
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);
    }

    if (search) queryParams.append('search', search);
    if (sort) queryParams.append('sort', sort);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);

    const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
    return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.product;
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
    console.log(productData,"fromt eh product slice")
    const response = await axios.post(API_URL, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    });
    return response.data.addProduct;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    });
    return response.data.updatedProduct;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
        filters: {
            category: '',
            minPrice: '',
            maxPrice: '',
            search: '',
            sort: '-createdAt',
            page: 1,
            limit: 12,
            availability: '',
            priceRange: ''
        },
        totalPages: 1,
        currentPage: 1,
        totalProducts: 0
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = {
                category: '',
                minPrice: '',
                maxPrice: '',
                search: '',
                sort: '-createdAt',
                page: 1,
                limit: 12
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch single product
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.selectedProduct?._id === action.payload._id) {
                    state.selectedProduct = action.payload;
                }
            })
            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
                if (state.selectedProduct?._id === action.payload) {
                    state.selectedProduct = null;
                }
            });
    }
});

export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;