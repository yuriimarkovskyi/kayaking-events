import { configureStore } from '@reduxjs/toolkit';
import visibilitySlice from './visibilitySlice';
import eventsSlice from './eventsSlice';
import membersSlice from './membersSlice';

export const store = configureStore({
  reducer: {
    events: eventsSlice,
    visibility: visibilitySlice,
    members: membersSlice,
  },
});
