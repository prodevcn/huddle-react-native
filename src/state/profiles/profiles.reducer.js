import keys from 'lodash/keys';
import * as types from './profiles.types';

const defaultState = {
  // Flat list of ordered profileIds
  list: [],

  // Hash of {[profileCode]: {profile}}
  profiles: {},

  activeProfileCode: '',
};

/**
 * Remove the given profile from the profiles object
 *
 * @param {Object} profiles
 * @param {string} toRemove
 */
const removeProfile = (profiles = {}, toRemove) => {
  const newProfiles = {};
  keys(profiles).forEach((code) => {
    if (code !== toRemove) {
      newProfiles[code] = profiles[code];
    }
  });
  return newProfiles;
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_PROFILE:
      return {
        ...state,
        list:
          // Don't add the profileId if our list already contains it
          state.list.includes(action.payload.profileCode)
            ? state.list
            : [...state.list, action.payload.profileCode],
        profiles: {
          ...state.profiles,
          [action.payload.profileCode]: action.payload,
        },
      };

    case types.SET_PROFILE:
      return {
        ...state,
        list: action.payload.codes,
        profiles: action.payload.profiles,
      };

    case types.UPDATE_CUSTOM_FIELD:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.profileCode]: {
            ...state.profiles[action.profileCode],
            custom: {
              ...action.newCustomField,
            },
          },
        },
      };

    case types.UPDATE_PROFILE:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.profileCode]: {
            ...state.profiles[action.profileCode],
            ...action.data,
          },
        },
      };

    case types.SET_ACTIVE_PROFILE:
      return {
        ...state,
        activeProfileCode: action.activeProfileCode,
      };

    case types.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((item) => item !== action.profileCode)],
        profiles: removeProfile(state.profiles, action.profileCode),
      };


    default:
      return state;
  }
};
