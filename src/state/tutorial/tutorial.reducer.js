import * as types from './tutorial.types';

const defaultMaskState = {
  radius: null,
  center: {},
};

const defaultState = {
  mask: defaultMaskState,
  steps: [],
  currentStep: 0,
  active: false,
  dismissAction: null,
  anchors: {},
  unread: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.START:
      return {
        ...state,
        active: true,
        mask: defaultMaskState,
        currentStep: 0,
        steps: action.steps,
      };

    case types.NEXT:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case types.SET_MASK:
      return {
        ...state,
        mask: {
          ...state.mask,
          ...action.payload,
        },
      };

    case types.DISMISS:
      return {
        ...state,
        active: false,
      };

    case types.REGISTER_ANCHOR:
      return {
        ...state,
        anchors: {
          ...state.anchors,
          [action.name]: action.anchor,
        },
      };

    case types.REGISTER_DISMISS:
      return {
        ...state,
        dismiss: action.dismiss,
      };

    // Both of these action should include the entire unread state
    // as their payload
    case types.RESET_UNREAD:
    case types.GET_UNREAD:
      return {
        ...state,
        unread: action.payload,
      };

    case types.CHANGE_UNREAD:
      return {
        ...state,
        unread: {
          ...state.unread,
          [action.payload.name]: action.payload.unread,
        },
      };

    default:
      return state;
  }
};
