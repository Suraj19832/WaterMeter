// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Authslice'; // Import your authSlice
// import userReducer from './slices/userSlice'; // Import your userSlice or other slices

const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    // Add more reducers here if needed
  },
});

export default store;
