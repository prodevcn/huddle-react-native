import TouchID from 'react-native-touch-id';

import { FACE_ID, FINGERPRINT } from '/constants/biometricTypes';
import * as types from './biometricAuthSettings.types';

export const checkBiometricSupport = () => (dispatch) => {
  dispatch({ type: types.CHECK_BIOMETRIC_SUPPORT });

  return TouchID.isSupported({
    // Without this parameter, on iOS isSupported will always return true
    passcodeFallback: false,
  })
    .then((biometryType) => {
      if (biometryType === FACE_ID) {
        dispatch({
          type: types.CHECK_BIOMETRIC_SUPPORT_SUCCESS,
          biometryType: FACE_ID,
        });
      } else {
        dispatch({
          type: types.CHECK_BIOMETRIC_SUPPORT_SUCCESS,
          biometryType: FINGERPRINT,
        });
      }

      return true;
    })
    .catch(() => {
      dispatch({
        type: types.CHECK_BIOMETRIC_SUPPORT_REJECTED,
      });

      return false;
    });
};

export const enableBiometricAuth = () => (dispatch) => {
  dispatch({
    type: types.ENABLE_BIOMETRIC_AUTH,
  });

  dispatch({
    type: types.ENABLE_BIOMETRIC_AUTH_SUCCESS,
  });
};

export const disableBiometricAuth = () => (dispatch) => {
  dispatch({
    type: types.DISABLE_BIOMETRIC_AUTH,
  });

  dispatch({
    type: types.DISABLE_BIOMETRIC_AUTH_SUCCESS,
  });
};
