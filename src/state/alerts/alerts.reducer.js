import * as types from './alerts.types';

const defaultState = {
  // This is an array so that we can queue alerts
  alerts: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          action.payload,
        ],
      };

    case types.DISMISS:
      return {
        ...state,
        alerts: state.alerts.slice(1),
      };

    default:
      return state;
  }
};
