import * as types from './offlineMode.types';

const defaultState = {
  offline: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_IS_OFFLINE:
      return {
        ...state,
        isOffline: action.payload.isOffline,
      };
    default:
      return state;
  }
};
