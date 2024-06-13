// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    clearAuthToken: (state) => {
      state.authToken = null;
    },
  },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;

export const selectAuthToken = (state) => state.auth.authToken;

export default authSlice.reducer;
