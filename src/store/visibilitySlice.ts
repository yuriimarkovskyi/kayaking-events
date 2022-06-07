import { createSlice } from '@reduxjs/toolkit';

type VisibilityState = boolean;

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: false as VisibilityState,
  reducers: {
    changeVisibility: (state) => !state,
  },
});

const { changeVisibility } = visibilitySlice.actions;

export default visibilitySlice.reducer;
export { changeVisibility };
