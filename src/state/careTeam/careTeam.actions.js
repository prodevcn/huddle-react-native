/* eslint-disable import/prefer-default-export */
import api from '/api';
import * as types from './careTeam.types';

export const fetchCareTeamList = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCH });

  const { activeProfileCode } = getState().profiles;

  try {
    const { careTeamInfoList } = await api.user.getCareTeam(activeProfileCode);

    dispatch({ type: types.FETCH_SUCCESS, list: careTeamInfoList });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    dispatch({ type: types.FETCH_FAILED });
  }
};

/**
 * @param {object} emailOrMobile
 * @param {string} [emailOrMobile.email]
 * @param {string} [emailOrMobile.mobile]
 */
export const addToCareTeam = (emailOrMobile) => async (dispatch, getState) => {
  dispatch({ type: types.ADD });

  const { activeProfileCode } = getState().profiles;

  try {
    await api.user.addCareTeam(emailOrMobile, activeProfileCode);

    dispatch({ type: types.ADD_SUCCESS });
  } catch (err) {
    dispatch({ type: types.ADD_FAILED });
    throw err;
  }
};

/**
 * @param {object} emailOrMobile
 * @param {string} [emailOrMobile.email]
 * @param {string} [emailOrMobile.mobile]
 */
export const removeFromCareTeam = (emailOrMobile) => async (dispatch, getState) => {
  dispatch({ type: types.REMOVE });

  const { activeProfileCode } = getState().profiles;

  try {
    if (emailOrMobile.email) {
      await api.user.removeCareTeam({ email: emailOrMobile.email }, activeProfileCode);
    } else {
      await api.user.removeCareTeam({ mobile: emailOrMobile.mobile }, activeProfileCode);
    }

    dispatch({ type: types.REMOVE_SUCCESS, contact: emailOrMobile });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    dispatch({ type: types.REMOVE_FAILED });
  }
};

export const clearCareTeamList = () => ({ type: types.CLEAR_LIST });
