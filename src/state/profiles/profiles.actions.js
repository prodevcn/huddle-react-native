/* eslint-disable import/prefer-default-export */
import api from '/api';
import { actions as careTeamActions } from '/state/careTeam';
import { actions as authActions } from '/state/auth';
import * as types from './profiles.types';

export const addProfile = (data) => {
  let custom = {};

  if (data.custom) {
    try {
      custom = JSON.parse(data.custom);

      // eslint-disable-next-line no-empty
    } catch (e) { }
  }

  return {
    type: types.ADD_PROFILE,
    payload: {
      ...data,
      custom,
    },
  };
};

export const setProfile = (data) => {
  const codes = [];
  const profiles = {};
  data.forEach((profile) => {
    codes.push(profile.profileCode);
    profiles[profile.profileCode] = profile;
  });

  return {
    type: types.SET_PROFILE,
    payload: {
      profiles,
      codes,
    },
  };
};

export const updateCustomField = ({ profileCode, newCustomField }) => (dispatch) =>
  dispatch({
    type: types.UPDATE_CUSTOM_FIELD,
    profileCode,
    newCustomField,
  });

export const setActiveProfile = (activeProfileCode) => (dispatch) => {
  dispatch({ type: types.SET_ACTIVE_PROFILE, activeProfileCode });
  // Set the current profile on the auth reducer, this will be persisted between sessions
  dispatch(authActions.setCurrentProfile(activeProfileCode));
  dispatch(careTeamActions.clearCareTeamList());
};

export const deleteProfile = (profileCode) => async (dispatch) => {
  dispatch({ type: types.DELETE_PROFILE });

  try {
    await api.user.remove(profileCode);

    dispatch({
      type: types.DELETE_PROFILE_SUCCESS,
      profileCode,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_PROFILE_FAILURE });
  }
};

export const updateProfile = ({ profileCode, data }) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE, profileCode, data });

  try {
    await api.user.updateOtherProfile(data, profileCode);

    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, profileCode, data });
  } catch (err) {
    dispatch({ type: types.UPDATE_PROFILE_FAILURE });
    throw err;
  }
};
