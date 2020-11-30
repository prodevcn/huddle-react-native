import * as types from './surveys.types';

const defaultState = {
  hash: null,
  onComplete: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SURVEY:
      return {
        ...state,
        hash: action.payload.hash,
        onComplete: action.payload.onComplete,
      };

    default:
      return state;
  }
};
