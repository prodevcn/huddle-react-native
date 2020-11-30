import * as types from './biometricAuthSettings.types';

const defaultState = {
  isLoading: false,
  biometricAuthEnabled: false,
  biometricSupport: false,
  biometryType: '',
  // We need to keep track of whether or not bioauth has ever been set, not just
  // if it is true/false
  biometricsHasBeenSet: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ENABLE_BIOMETRIC_AUTH:
      return {
        ...state,
        isLoading: true,
      };

    case types.ENABLE_BIOMETRIC_AUTH_SUCCESS:
      return {
        ...state,
        biometricAuthEnabled: true,
        isLoading: false,
        biometricsHasBeenSet: true,
      };

    case types.DISABLE_BIOMETRIC_AUTH:
      return {
        ...state,
        isLoading: true,
      };

    case types.DISABLE_BIOMETRIC_AUTH_SUCCESS:
      return {
        ...state,
        biometricAuthEnabled: false,
        biometricsHasBeenSet: true,
        isLoading: false,
      };

    case types.CHECK_BIOMETRIC_SUPPORT:
      return {
        ...state,
        isLoading: true,
      };

    case types.CHECK_BIOMETRIC_SUPPORT_SUCCESS:
      return {
        ...state,
        biometricSupport: true,
        isLoading: false,
        biometryType: action.biometryType,
      };

    case types.CHECK_BIOMETRIC_SUPPORT_REJECTED:
      return {
        ...state,
        biometricSupport: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
