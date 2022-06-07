import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';
import visibilitySlice from './visibilitySlice';

const store = configureStore({
  reducer: {
    events: eventsSlice,
    visibility: visibilitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
