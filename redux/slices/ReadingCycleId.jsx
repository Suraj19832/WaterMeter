// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meterCycleId:{}
};

const meterCycleId = createSlice({
  name: 'cycleId',
  initialState,
  reducers: {
    setMeterCycleId: (state, action) => {
      state.meterCycleId = action.payload;
    },

  },
});

export const { setMeterCycleId } = meterCycleId.actions;


export default meterCycleId.reducer;
