import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { eventsReducer } from './eventsReducer';
import { visibilityReducer } from './visibilityReducer';
import { membersReducer } from './membersReducer';

const rootReducer = combineReducers({
  events: eventsReducer,
  visibility: visibilityReducer,
  members: membersReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
