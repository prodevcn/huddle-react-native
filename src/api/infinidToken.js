import AsyncStorage from '@react-native-community/async-storage';
import apiUtil from './util';
import Config from 'react-native-config';

import {
  API_ROOT,
  HUDDLE_TOKEN_API_USERNAME,
} from '/constants/config';

const STORAGE_TOKEN_KEY = 'authHeaderToken';
const STORAGE_EXPIRY_KEY = 'authHeaderExpiry';
const SAFE_MINUTES_BEFORE_EXPIRY = 20;

const minutesBeforeRefresh = SAFE_MINUTES_BEFORE_EXPIRY * 60 * 1000;

const isStale = (expiry) => {
  const timedOut = (minutesBeforeRefresh + new Date(expiry).getTime()) < new Date().getTime();
  return expiry === null || timedOut;
};

// Stack overflow copypasta
const btoa = (input) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';

  // eslint-disable-next-line no-cond-assign
  for (let block = 0, charCode, i = 0, map = chars;
    // eslint-disable-next-line no-bitwise
    input.charAt(i | 0) || (map = '=', i % 1);
    // eslint-disable-next-line no-bitwise,no-mixed-operators
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
    charCode = input.charCodeAt(i += 3 / 4);

    if (charCode > 0xFF) {
      throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }

    // eslint-disable-next-line no-bitwise,no-mixed-operators
    block = block << 8 | charCode;
  }

  return output;
};

// Util class that will store the infinid token and either return it to us, if it is valid,
// or request a new one when we need it for a request
class InfinidToken {
  // Request a new token from the Huddle API
  // note: we don't want to use our custom `post()` function here, to avoid infinit recursion
  requestNewToken = async () => {
    const basic = btoa(`${HUDDLE_TOKEN_API_USERNAME}:${Config.INFINID_TOKEN_PASSWORD}`);

    const res = await fetch(`${API_ROOT}/token/operation/v1`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
      },
      body: JSON.stringify({
        accessContext: {
          requestId: apiUtil.getRequestId(),
          timestamp: apiUtil.getDate,
        },
        action: 'get',
      }),
    });

    const result = await apiUtil.handleResponse(res);

    const expiryDate = new Date(result.accessToken.expiresIn + new Date().getTime()).toISOString();

    // Add the new token and expiry to async storage
    await AsyncStorage.multiSet([
      [STORAGE_TOKEN_KEY, result.accessToken.token],
      [STORAGE_EXPIRY_KEY, expiryDate],
    ]);

    // Save the token and expiry on the class for instant access
    this.infinidToken = result.accessToken.token;
    this.infinidTokenExpiry = expiryDate;

    return result.accessToken.token;
  };

  removeTokenFromStorage = async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_EXPIRY_KEY, STORAGE_EXPIRY_KEY]);
      this.infinidToken = null;
      this.infinidTokenExpiry = null;
    } catch (e) {
      // This should be a dev only error (will show a yellow box). This only happens when
      // switching environments
      // eslint-disable-next-line no-console
      console.warn('Could not remove infinid token');
    }
  }

  // Check to see if there is a token in async storage, and check if it's valid
  // If it isn't request a new one
  getTokenFromStorage = async () => {
    try {
      const keys = [STORAGE_TOKEN_KEY, STORAGE_EXPIRY_KEY];
      const [[, authToken], [, authExpiry]] = await AsyncStorage.multiGet(keys);

      // If the token has expired we will request a new token
      if (isStale(authExpiry)) {
        throw new Error('Stale');
      }

      // Token is found and is valid - set it on the class and return it
      this.infinidToken = authToken;
      this.infinidTokenExpiry = authExpiry;

      return authToken;
    } catch (e) {
      // The above will throw an error if the keys are not there or the token
      // is in storage but has expired, at which point we want to request a new token
      return this.requestNewToken();
    }
  };

  /**
   * Return an infinid token. This token will be passed with each request.
   * The back end has asked us to send one with each request.
   *
   * Before we request a new token from the API we will check to see if one
   * exists locally **and is valid**.
   *
   * We will first check if the token exists on this class.
   *
   * If it doesn't or is invalid we will check async storage for a valid token.
   *
   * If a token doesn't exist in either of those places we will request a new one
   * from the API
   */
  getInfinidToken = () => {
    if (this.infinidToken && !isStale(this.infinidTokenExpiry)) {
      return this.infinidToken;
    }

    return this.getTokenFromStorage();
  };
}

export default new InfinidToken();
