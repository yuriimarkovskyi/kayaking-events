import { initialState } from './state';

export const ADD_MEMBER = 'ADD_MEMBER';

export const membersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MEMBER:
      return { ...state, members: [...state.members, action.payload] };
    default:
      return state;
  }
};
