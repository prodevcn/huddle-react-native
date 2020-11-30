import * as types from './onboarding.types';

const defaultState = {
  flow: 'signup',
  data: {},
  pinCode: null,

  // A hash that is set if the call to `user::lookup` returns data. We
  // will use this as pre-populated user data
  suggestionData: null,

  // registeringAsCaregiver is set to true if we are importing a profile
  // from LINK and select the option "I am X's care taker." We use it so
  // symbolize that we need to use `suggestionData` to create the profile
  // rather than taking the user to the enterInfo screen
  registeringAsCaregiver: false,

  // Keep track if a user registers
  newUser: false,

  onboardingDismissed: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.pinCode,
      };

    case types.CHANGE_FLOW:
      return {
        ...state,
        flow: action.flow,
      };

    case types.ADD_FORM_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...(action.payload || {}),
        },
      };

    case types.LOOKUP_RESULTS:
      return {
        ...state,
        suggestionData: action.payload,
      };

    case types.CLEAR_FORM_DATA:
      return {
        ...state,
        data: {},
      };

    case types.REGISTER:
      return {
        ...state,
        newUser: true,
      };

    case types.ONBOARDING_DISMISSED:
      return {
        ...state,
        onboardingDismissed: true,
      };

    case types.SET_REGISTERING_AS_CAREGIVER:
      return {
        ...state,
        registeringAsCaregiver: !!action.payload.registeringAsCaregiver,
      };

    default:
      return state;
  }
};
