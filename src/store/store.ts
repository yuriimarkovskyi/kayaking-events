import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';

const store = configureStore({
  reducer: {
    events: eventsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
