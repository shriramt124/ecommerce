import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/category';

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default categorySlice.reducer;