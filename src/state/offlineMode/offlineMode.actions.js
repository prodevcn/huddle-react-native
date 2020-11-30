/* eslint-disable import/prefer-default-export */

import * as types from './offlineMode.types';

export const setIsOffline = (isOffline) => ({
  type: types.SET_IS_OFFLINE,
  payload: { isOffline },
});
