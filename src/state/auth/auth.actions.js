/* eslint-disable import/prefer-default-export */
import mixpanel from '/util/mixpanelService';
import { secureStorage } from '/util';
import serverAgent from '/api/serverAgent';
import InfinidToken from '/api/infinidToken';

import * as types from './auth.types';

export const setCurrentProfile = (profileCode) => ({
  type: types.SET_CURRENT_PROFILE,
  profileCode,
});

export const setAccessToken = (accessToken) => {
  serverAgent.setAccessToken(accessToken);

  return ({
    type: types.SET_ACCESS_TOKEN,
    accessToken,
  });
};

export const logout = () => async (dispatch, getState) => {
  const { isOffline } = getState().offlineMode;
  try {
    if (!isOffline) {
      mixpanel.reset();
    }
    // clear the pin and validation code from keychain
    await secureStorage.clearStorage();
    InfinidToken.removeTokenFromStorage();
  } catch (e) {
    throw new Error(e);
  }

  // Remove the accessToken from the server agent
  serverAgent.clearAccessToken();

  // Logout, which will blow away the auth store
  dispatch({ type: types.LOGOUT });
};
