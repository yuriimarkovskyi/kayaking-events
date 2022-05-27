import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: false,
  reducers: {
    changeVisibility: (state) => !state,
  },
});

const { changeVisibility } = visibilitySlice.actions;

export default visibilitySlice.reducer;
export { changeVisibility };
