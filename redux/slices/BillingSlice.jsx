// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billingAddress: null,
};

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    setBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
  },
});

export const { setBillingAddress } = billingSlice.actions;

export default billingSlice.reducer;
