import * as types from './mixpanel.types';

const defaultState = {
  screenName: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SCREEN_NAME:
      return {
        ...state,
        screenName: action.screenName,
      };

    case types.SET_GROUP: {
      // Disallow overwriting
      if (state[action.groupName]) {
        return state;
      }

      return {
        ...state,
        [action.groupName]: action.groupValue,
      };
    }

    default:
      return state;
  }
};
