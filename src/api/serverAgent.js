import uuidv1 from 'uuid/v1';

import { API_ROOT } from '/constants/config';
import InfinidToken from './infinidToken';
import apiUtil from './util';

class Network {
  appName = 'HUDDLE';

  sessionId = uuidv1();

  setAccessToken = (accessToken) => {
    this.accessToken = accessToken;
  };

  clearAccessToken = () => {
    this.accessToken = null;
  };

  getUserIdAuth = () => {
    const auth = {};
    if (this.accessToken) {
      auth.userIdentifier = this.accessToken;
    }

    return auth;
  };

  /**
   * Make a post request to the api
   *
   * Available `options`:
   *   - `skipJWTAuth` will exclude the jwtAuthorization header
   *
   * @param {string} resource
   * @param {string} action
   * @param {object} body
   * @param {object} options
   */
  post = async (resource, action, body = {}, options = {}) => {
    const date = options.date || apiUtil.getDate();

    const infinidToken = await InfinidToken.getInfinidToken();

    const authHeaders = { Authorization: infinidToken };

    // Users may want to skip auth, for example when registering. If there is a
    // JWT here it will think that you want to add a subprofile instead of
    // registering yourself a new user
    if (!options.skipJWTAuth && this.accessToken) {
      authHeaders.jwtAuthorization = `Bearer ${this.accessToken}`;
    }

    const payload = {
      ...body,
      action,
      accessContext: {
        appName: this.appName,
        requestId: apiUtil.getRequestId(),
        timestamp: date,
        ...options.accessContext,
      },
    };

    return fetch(`${API_ROOT}/${resource}/operation/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
      body: JSON.stringify(payload),
    }).then((res) => apiUtil.handleResponse(res, { action }));
  };

  uploadImage = (url, internalAccessName, blob) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error('could not send'));
        }
      }
    };

    const { uri, mimeType } = blob;

    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.send({ uri, type: mimeType, name: internalAccessName });
  })
}
export default new Network();
