// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/Authslice"; // Import your authSlice
// import userReducer from './slices/userSlice'; // Import your userSlice or other slices
import uniqueReducer from "./slices/UniqueSlice";
import meterReducer from "./slices/MeterSlice";
import billingReducer from "./slices/BillingSlice";
import meterCycleId from "./slices/ReadingCycleId";

const store = configureStore({
  reducer: {
    auth: authReducer,
    unique: uniqueReducer,
    MeterSlice: meterReducer,
    billingSlice: billingReducer,
    readingCycleId: meterCycleId
  },
});

export default store;
