import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state with default values
const initialState = {
    stats: {
        totalUsers: 0,
        activeUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        revenue: 0
    },
    users: [],
    loading: false,
    error: null
};

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
    'admin/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/user/dashboard-stats');
            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
        }
    }
);

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/user', { withCredentials: true });
            return data.users;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const blockUser = createAsyncThunk(
    'admin/blockUser',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/admin/users/${userId}/block`, { withCredentials: true });
            return { userId, data: data.block };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to block user');
        }
    }
);

export const unblockUser = createAsyncThunk(
    'admin/unblockUser',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/admin/users/${userId}/unblock`, { withCredentials: true });
            return { userId, data: data.unblock };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to unblock user');
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Dashboard Stats
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                state.stats = action.payload;
                state.error = null;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.stats = null;
            })
            // Fetch Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Block User
            .addCase(blockUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user._id === action.payload.userId);
                if (index !== -1) {
                    state.users[index].isBlocked = action.payload.data;
                }
            })
            // Unblock User
            .addCase(unblockUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user._id === action.payload.userId);
                if (index !== -1) {
                    state.users[index].isBlocked = action.payload.data;
                }
            });
    }
});

export default adminSlice.reducer;