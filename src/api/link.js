/* eslint-disable import/prefer-default-export */
import api from './serverAgent';

const RESOURCE = 'link';

/**
 * Get the active meds for the profile from link
 *
 * @param {string} profileCode
 */
export const getActiveMed = (profileCode) => api.post(RESOURCE, 'getActiveMed', {}, { accessContext: { profileCode } });
