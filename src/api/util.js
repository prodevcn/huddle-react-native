import RequestError from './errors/RequestError';
// Dont use the store to avoid cyclical imports
import mixpanel from '/util/mixpanelService';
import errorLogger from '/util/errorLogger';
import redactor from '/util/redactor';

/**
 * Given an API request, parse it and figure out if it is an error or not
 *
 * Note: the API doesn't send us meaningful status codes, everything is
 * a 200 SUCCESS and we need to check the `status` on the response to
 * see if it is invalid.
 *
 * ANY status other than `000-00-0000` is an error.
 *
 * @param {Object} res
 */
const handleResponse = (res, params = {}) =>
  new Promise((resolve, reject) => {
    if (res.status > 400) {
      const safeErrorProperties = redactor({
        message: `Unexpected error code: ${res.status}`,
        ...params,
      }, { source: 'external' }).sanitize();

      const errorProperties = {
        url: res.url,
        ...safeErrorProperties,
      };

      if (res.status >= 500) {
        errorLogger.server(errorProperties);
      }
      mixpanel.trackWithProperties('Error: API Request', errorProperties);

      return reject(new Error(`Unexpected server error. Coe: ${res.status}`));
    }

    const action = res.headers.map['content-type'].match(/image/i) ? 'blob' : 'json';

    return res[action]()
      .then((json) => {
        if (json.status && json.status.code !== '000-00-0000') {
          reject(new RequestError(json.status.code, json.status.message));

          const safeErrorProperties = redactor({
            message: json.status.message,
            ...params,
          }, { source: 'external' }).sanitize();

          const errorProperties = {
            url: res.url,
            code: `(${json.status.code})`,
            ...safeErrorProperties,
          };

          mixpanel.trackWithProperties('Error: API Request', errorProperties);
        } else {
          if (action === 'blob') {
            resolve(URL.createObjectURL(json));
            return;
          }

          resolve(json);
        }
      })
      .catch(() => {
        reject(new Error('Could not decode response'));
      });
  });

export default {
  getDate: () => new Date().toISOString(),
  getRequestId: () => 1,
  handleResponse,
};
