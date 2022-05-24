import { configureStore, combineReducers } from '@reduxjs/toolkit';
import visibilitySlice from './visibilitySlice';
import eventsSlice from './eventsSlice';
import registrationsSlice from './registrationsSlice';

const rootReducer = combineReducers({
  events: eventsSlice,
  registrations: registrationsSlice,
  visibility: visibilitySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
