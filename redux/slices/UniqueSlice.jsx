import { createSlice } from '@reduxjs/toolkit';

const uniqueSlice = createSlice({
  name: 'unique',
  initialState: {
    booleanValue: false,
    stringValue: '',
  },
  reducers: {
    setBooleanValue(state, action) {
      state.booleanValue = action.payload;
    },
    setStringValue(state, action) {
      state.stringValue = action.payload;
    },
  },
});

export const { setBooleanValue, setStringValue } = uniqueSlice.actions;

export const selectBooleanValue = (state) => state.unique.booleanValue;
export const selectStringValue = (state) => state.unique.stringValue;

export default uniqueSlice.reducer;
