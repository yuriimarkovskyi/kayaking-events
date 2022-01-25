const initialState = {
  visibility: false,
};

const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY';

export const visibilityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return { ...state, visibility: !state.visibility };

    default:
      return state;
  }
};

export const changeVisibilityAction = () => ({ type: CHANGE_VISIBILITY });
