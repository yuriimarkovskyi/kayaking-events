import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import eventsSlice from './eventsSlice';
import registrationsSlice from './registrationsSlice';
import visibilitySlice from './visibilitySlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['visibility', 'events'],
};

const rootReducer = combineReducers({
  events: eventsSlice,
  registrations: registrationsSlice,
  visibility: visibilitySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer };
