// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meterDataParams:{}
};

const meterSlice = createSlice({
  name: 'meter',
  initialState,
  reducers: {
    setMeterPropertyID: (state, action) => {
      state.meterDataParams = action.payload;
      console.log(action.payload,">>>>>>>>>>>>>>>payload")
    },

  },
});

export const { setMeterPropertyID } = meterSlice.actions;


export default meterSlice.reducer;
