import api from './serverAgent';

const MEDSEARCH_MAX_ITEMS = 10;
const RESOURCE = 'tool';

/**
 * @see https://confluence.drfirst.com/display/PH/DEV%3A+Huddle+Tool+API#DEV:HuddleToolAPI-action:scanning
 * @param {{ userId: string, signature: string, data: string }} payload
 */
export const scanning = (payload) => api.post(RESOURCE, 'scanning', {
  contentType: 'image/jpeg',
  ...payload,
});

/**
 * @see https://confluence.drfirst.com/pages/viewpage.action?spaceKey=INS&title=SmartSearch+2.0+API#SmartSearch2.0API-1-MedicineSearch
 * @param {string} profileCode
 * @param {string} query
 */
export const medsearch = async (profileCode, query) => {
  /**
   * Params are explained at the SmartSearch API
   * @see https://confluence.drfirst.com/display/PH/DEV%3A+Huddle+Tool+API#DEV:HuddleToolAPI-action:medsearch
   * @param patientId ID corresponding to patient (needed for benefits of personalization)
   * @param searchString Search query string
   * @param sessionId ID corresponding to session (needed for benefits of personalization)
   * @param nrec number of result to return, default value = 20
   * @param searchType Should be set to a value of 0 (zero)
   * @param userId ID corresponding to your username (needed for benefits of personalization)
   */
  const result = await api.post(RESOURCE, 'medsearch', {
    patientId: profileCode,
    searchString: query,
    sessionId: api.sessionId,
    nrec: MEDSEARCH_MAX_ITEMS,
    searchType: 0, // Should be set to a value of 0 (zero) according to documentation
    userId: api.appName,
  });

  return result;
};

/**
 * @see https://confluence.drfirst.com/display/PH/DEV%3A+Huddle+Tool+API#DEV:HuddleToolAPI-action:medsave
 * @param {{ profileCode: string, medicationId: string }} payload
 */
export const saveSelectedMed = (payload) => api.post(RESOURCE, 'medsave', {
  patientId: payload.profileCode,
  selectedMeds: payload.medicationId,
  sessionId: api.sessionId,
  userId: api.appName,
});
