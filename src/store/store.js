import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import visibilitySlice from './visibilitySlice';
import eventsSlice from './eventsSlice';
import registrationsSlice from './registrationsSlice';

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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
