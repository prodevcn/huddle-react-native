import api from './serverAgent';
import apiUtil from './util';
import UniquenessError from '/api/errors/UniquenessError';
import sha256 from 'crypto-js/sha256';

import fileVersions from '/constants/fileVersions';

const RESOURCE = 'user';

/**
 * Asynchronously sends a code to `address` via `type`.
 *
 * The response will contain a `validationCode` which you should
 * pass to the subsequent `verify()` call.
 *
 * @param {'mobile'|'email'} type
 * @param {string} address
 */
export const getVerificationCode = (type, address) =>
  api.post(
    RESOURCE,
    'validate',
    { [type]: address },
    {
      skipJWTAuth: true,
    },
  );

/**
 * Sends the `validationCode`, which was received in the
 * previous `getVerificationCode()` call, along with the
 * `code` that the user received via `type` to the API
 * to act as 2fa
 *
 * @param {'mobile'|'email'} type
 * @param {string} address
 * @param {string} code
 * @param {string} validationCode
 */
export const verify = (type, address, code, validationCode) => {
  const hashedCode = sha256(code);

  return api.post(
    RESOURCE,
    'validate',
    {
      [type]: address,
      pinCode: hashedCode.toString(),
      validationCode,
    },
    {
      skipJWTAuth: true,
    },
  );
};

/**
 * Registers the current user.
 *
 * **Note:** At least one of `data.email` or `data.mobile` must be included
 * **Note:** If you are trying to register a different profile, use `registerProfile()`
 *
 * @param {object} data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.dob date of birth
 * @param {string} data.pinCode
 * @param {string} [data.email]
 * @param {string} [data.mobile]
 */
export const register = (data) => api.post(
  RESOURCE,
  'regist',
  {
    ...data,
    ...fileVersions,
  },
  { skipJWTAuth: true },
);

/**
 * Log the user in.
 *
 * **Note:** their `token` must be set in the serverAgent
 *
 * @param {string} pinCode
 * @param {string} [email]
 * @param {string} [mobile]
 * @param {string} validationCode
 * You will get the validationCode in the response when you verify your phone/email.
 * The phone/email you provide here must match the one you verified
 */
export const login = (pinCode, email, mobile, validationCode) => {
  // TODO toadums If I understood correctly, we needed to send a
  // hashed pinCode to the api, as well as the pinHashToken. But
  // that doesn't seem to work - the API wants it in plain text
  // const pinCode = sha256(code);
  const date = apiUtil.getDate();
  const pinHashToken = sha256(date + pinCode);

  return api.post(
    RESOURCE,
    'login',
    {
      email,
      mobile,
      pinCode,
      pinHashToken: pinHashToken.toString(),
      validationCode,
    },
    { date },
  );
};

/**
 * Makes a request to reset the users pinCode.
 *
 * One of `data.email` or `data.mobile` must be included
 *
 * @param {object} data Payload for the resetPin call
 * @param {string} data.firstName User's first name
 * @param {string} data.lastName User's last name
 * @param {string} data.dob User's date of birth
 * @param {string} data.code The new pinCode
 * @param {string} [data.email]
 * @param {string} [data.mobile]
 */
export const resetPin = ({ custom, ...data }) => api.post(RESOURCE, 'resetPIN', data);

/**
 * Registers a profile of type `type` for the current user.
 *
 * @param {object} data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.dob date of birth
 * @param {string} type the type of the profile you'd like to register such as Child or Parent
 */
export const registerProfile = (data) =>
  api.post(RESOURCE, 'regist', {
    ...data,
    ...fileVersions,
  });

/**
 * Looks up if a user is registered with the give email **and/or** phone number.
 * It will return an array of matches and specify where each was registered
 * from - for example Huddle vs. Link.
 *
 * @param {object} data
 * @param {string} data.email
 * @param {string} data.mobile
 */
export const lookup = async (data) => {
  try {
    const response = await api.post(RESOURCE, 'lookup', data, { skipJWTAuth: true });
    return response;
  } catch (e) {
    if (e.message.match(/already exists/i)) {
      throw new UniquenessError(`${JSON.stringify(data)} is already taken`);
    }

    throw e;
  }
};

/**
 * Update profile information
 *
 * @param {object} data
 * @param {string} [data.email]
 * @param {string} [data.mobile]
 * @param {string} [data.firstName]
 * @param {string} [data.lastName]
 * @param {string} [data.dob]
 */
export const update = (data) => api.post(RESOURCE, 'update', data);

/**
 * Update other profiles information
 *
 * @param {object} data
 * @param {string} [data.firstName]
 * @param {string} [data.lastName]
 * @param {string} [data.dob]
 */
export const updateOtherProfile = (data, profileCode) =>
  api.post(RESOURCE, 'update', data, { accessContext: { profileCode } });

/**
 * Remove other profile.
 * Can't remove self.
 * Remove profile will also remove all doc records belong to this profile/album.
 *
 * @param {string} profileCode
 */
export const remove = (profileCode) => api.post(RESOURCE, 'remove', {}, { accessContext: { profileCode } });

/**
 * Add contact to "Care team"
 *
 * @param {object} data
 * @param {string} [data.email]
 * @param {string} [data.mobile]
 * @param {string} profileCode
 */
export const addCareTeam = (data, profileCode) => api.post(RESOURCE, 'addCareTeam', data, { accessContext: { profileCode } });

/**
 * Get current care team
 * @param {string} profileCode
 */
export const getCareTeam = (profileCode) => api.post(RESOURCE, 'getCareTeam', {}, { accessContext: { profileCode } });

/**
 * Remove contact from "Care team"
 *
 * @param {object} data
 * @param {string} [data.email]
 * @param {string} [data.mobile]
 * @param {string} profileCode
 */
export const removeCareTeam = (data, profileCode) => api.post(RESOURCE, 'removeCareTeam', data, { accessContext: { profileCode } });

/**
 * Get information about a user who invited you to their care team
 *
 * @param {object} data
 * @param {string} [data.email]
 * @param {string} [data.mobile]
 * @param {string} validationCode
 */
export const getCareInviter = (data) => api.post(RESOURCE, 'getCareInviter', data);
