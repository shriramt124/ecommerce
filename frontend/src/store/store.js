import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import adminReducer from './features/adminSlice';
import categoryReducer from './features/categorySlice';
  const store = configureStore({
  reducer: {
    products: productReducer,
      admin: adminReducer,
      categories: categoryReducer
  },
  });

export default store;