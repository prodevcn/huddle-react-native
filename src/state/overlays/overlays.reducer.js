import * as types from './overlays.types';

const defaultState = {
  // This is an array so that we can queue overlays
  overlays: [],

  // A boolean to keep track when we transition to a new overlay while one is open
  transitioning: false,

  // A boolean to keep track of whether or not the overlay is currently dismissing
  dismissing: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW:
      return {
        ...state,
        overlays: [
          ...state.overlays,
          action.payload,
        ],
        dismissing: false,
      };

    case types.DISMISS:
      return {
        ...state,
        overlays: state.overlays.slice(1),
        dismissing: false,
      };

    case types.DISMISSING:
      return {
        ...state,
        dismissing: true,
      };

    case types.TRANSITION:
      return {
        ...state,
        transitioning: action.payload,
      };

    default:
      return state;
  }
};
