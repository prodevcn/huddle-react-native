import * as types from './onboarding.types';
import RNSecureKeyStore from 'react-native-secure-key-store';
import find from 'lodash/find';
import get from 'lodash/get';

import { actions as authActions } from '/state/auth';
import { actions as profileActions } from '/state/profiles';
import { actions as mixpanelActions } from '/state/mixpanel';

import { format, secureStorage } from '/util';

import api from '/api';

export const changeFlow = (flow) => ({
  type: types.CHANGE_FLOW,
  flow,
});

export const clearFormData = () => ({
  type: types.CLEAR_FORM_DATA,
});

export const setPinCode = (code) => ({
  type: types.SET_PIN_CODE,
  pinCode: format.encryptPinCode(code),
});

export const addFormData = (values) => {
  const payload = { ...values };

  if (values.dob) {
    payload.dob = format.appDateToAPIDate(values.dob);
  }

  if (values.email) {
    payload.custom = { email: values.email };
  }

  if (values.mobile) {
    payload.custom = { mobile: values.mobile };
  }

  return {
    type: types.ADD_FORM_DATA,
    payload,
  };
};

export const register = (defaultValues = {}) => async (dispatch, getState) => {
  // As the user steps through the registration flow we will store the values
  // in redux. Once they submit the final register form we get all the data
  // and that is what we use as our payload to the api
  const { data: enteredData, pinCode } = getState().onboarding;

  // Merge the two custom fields together
  const custom = {
    ...(enteredData.custom || {}),
    ...(defaultValues.custom || {}),
  };

  const data = {
    ...defaultValues,
    ...enteredData,
    custom: JSON.stringify(custom),
  };

  try {
    const response = await api.user.register({
      pinCode,
      validationCode: secureStorage.validationCode,
      ...data,
    });
    const masterProfileCode = response.profileCode;

    dispatch(authActions.setCurrentProfile(masterProfileCode));
    dispatch(profileActions.setActiveProfile(masterProfileCode));
    dispatch(mixpanelActions.createAlias(masterProfileCode, masterProfileCode));

    secureStorage.setPin(pinCode);

    // We need to login immediately after registering because the API doesn't
    // return us profile data after registering. So if you accept an invite
    // you won't be able to see the profile(s) that invited you
    // We don't want to throw an error here - the user just won't be able
    // to see other profiles
    try {
      const loginResponse = await api.user.login(
        pinCode,
        enteredData.email,
        enteredData.mobile,
        secureStorage.validationCode,
      );

      if (loginResponse.jwtString) {
        dispatch(authActions.setAccessToken(loginResponse.jwtString));
      }

      const profiles = loginResponse.profile || [];
      profiles.forEach((profile) => dispatch(profileActions.addProfile(profile)));
    } catch (e) {
      // If there was an error, make sure the user's profile is added to redux
      const profileData = {
        profileCode: response.profileCode,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        master: true,
        custom: data.custom,
      };

      dispatch(profileActions.addProfile(profileData));
    }

    dispatch({ type: types.REGISTER });

    return response;
  } catch (e) {
    dispatch({ type: types.REGISTER_FAILED });
    throw e;
  }
};

export const login = (pinCode, validationCode = secureStorage.validationCode) => async (
  dispatch,
  getState,
) => {
  try {
    const { data } = getState().onboarding;
    const currentProfileCode = getState().profiles.activeProfileCode;

    const response = await api.user.login(pinCode, data.email, data.mobile, validationCode);
    const profiles = response.profile || [];
    const masterProfile = find(profiles, (profile) => {
      const { email, mobile } = profile.custom;
      // If this user is added to somebody else's care team, that user's profile will show up
      // as `{master: true}`, so we also need to makes ure that the email/phone is correct
      const sameUser = email === data.email || mobile === data.mobile;

      return profile.master && sameUser;
    }) || profiles[0];

    dispatch(profileActions.setProfile(profiles));

    if (response.jwtString) {
      dispatch(authActions.setAccessToken(response.jwtString));
    }
    dispatch(mixpanelActions.identifyUser(masterProfile.profileCode));


    // Do we have a current profile? And is that profile valid (on logged in users' profiles)?
    // If not we will set the current profile to the master
    const currentProfile = find(profiles, (profile) => profile.profileCode === currentProfileCode);
    if (!currentProfile) {
      dispatch(profileActions.setActiveProfile(masterProfile.profileCode));
    }

    secureStorage.setPin(pinCode);

    return response;
  } catch (e) {
    dispatch({ type: types.LOGIN_FAILED });
    throw e;
  }
};

export const resetPin = () => async (dispatch, getState) => {
  const { data, pinCode } = getState().onboarding;

  // TODO toadums we need to some how get the `userIdentifier` and
  // set it after this request.
  // Note: depending on implementation we may get the userIdentifier
  // before we resetPin, in which case it would be in the body of this request

  const res = await api.user.resetPin({
    pinCode,
    validationCode: secureStorage.validationCode,
    ...data,
  });

  // After we reset our pin, we need to login since the reset endpoint
  // doesn't return us our userId or jwt or anything
  dispatch(login(pinCode));
  return res;
};

export const registerProfile = (values, type) => async (dispatch) => {
  try {
    const data = {
      ...values,
      custom: JSON.stringify({
        ...(values.custom || {}),
        relationship: type,
      }),
    };

    const response = await api.user.registerProfile(data);

    const profileData = {
      ...data,
      profileType: response.profileType,
      profileCode: response.profileCode,
      master: false,
    };

    dispatch(profileActions.addProfile(profileData));
  } catch (e) {
    dispatch({ type: types.REGISTER_PROFILE_FAILED });
    throw e;
  }
};

export const lookup = (data) => async (dispatch) => {
  const res = await api.user.lookup(data);

  if (get(res, 'suggestion.length')) {
    const suggestion = res.suggestion[res.suggestion.length - 1];

    // Make sure the data has the fields that we need
    if (suggestion.firstName && suggestion.lastName && suggestion.dob) {
      const {
        firstName,
        lastName,
        dob,
        appName,
        suggestionUniqueName,
        // we don't want to use the provided mobile or email here. We want
        // to only use the verified value the user enters during the
        // onboarding flow.
        mobile,
        email,
        ...custom
      } = suggestion;

      // Store the suggestion in this format so that we can easily merge it in with
      // user entered data during onboarding
      const payload = {
        suggestionUniqueName,
        firstName,
        lastName,
        dob,
        custom: {
          ...custom,
          signupId: suggestionUniqueName,
          signupSource: appName || 'LINK',
        },
      };

      dispatch({
        type: types.LOOKUP_RESULTS,
        payload,
      });
      dispatch(mixpanelActions.setUserPropOnce({ referrer: payload.custom.signupSource }));
      dispatch(mixpanelActions.setGroup('referrer', payload.custom.signupSource));

      return;
    }
  }

  // Nothing should happen if we don't get any results
  dispatch({ type: types.LOOKUP_NOOP });
};

export const setRegisteringAsCaregiver = (registeringAsCaregiver) => ({
  type: types.SET_REGISTERING_AS_CAREGIVER,
  payload: {
    registeringAsCaregiver,
  },
});

/**
 * This action is for dev-only so that we can get around needing to
 * log in every time the app opens if we have credentials
 */
export const devLogin = () => async (dispatch) => {
  if (!__DEV__) {
    throw new Error('This action is dev-only');
  }

  const pin = await RNSecureKeyStore.get('PIN');
  const code = await RNSecureKeyStore.get('VALIDATION_CODE');

  if (pin && code) {
    await dispatch(login(pin, code));
  } else {
    throw new Error();
  }
};

/**
 * This will just set a boolean in the reducer to let any components
 * who care know that the onboarding modal was dismissed
 */
export const setDismissed = () => ({
  type: types.ONBOARDING_DISMISSED,
});
