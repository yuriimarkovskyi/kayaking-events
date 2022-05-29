import { combineReducers } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';
import visibilitySlice from './visibilitySlice';

const rootReducer = combineReducers({
  events: eventsSlice,
  visibility: visibilitySlice,
});

export { rootReducer };
