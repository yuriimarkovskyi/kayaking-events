import { configureStore } from '@reduxjs/toolkit';
import visibilitySlice from './visibilitySlice';
import eventsSlice from './eventsSlice';
import registrationsSlice from './registrationsSlice';

export const store = configureStore({
  reducer: {
    events: eventsSlice,
    registrations: registrationsSlice,
    visibility: visibilitySlice,
  },
});
