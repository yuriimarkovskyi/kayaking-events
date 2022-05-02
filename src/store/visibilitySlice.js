import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: false,
  reducers: {
    changeVisibility: (state) => !state,
  },
});

export const { changeVisibility } = visibilitySlice.actions;

export default visibilitySlice.reducer;
