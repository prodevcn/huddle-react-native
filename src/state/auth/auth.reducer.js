import * as types from './auth.types';

const defaultState = {
  profileCode: null,
  accessToken: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    case types.SET_CURRENT_PROFILE:
      return {
        ...state,
        profileCode: action.profileCode,
      };

    case types.LOGOUT:
      return defaultState;

    default:
      return state;
  }
};
