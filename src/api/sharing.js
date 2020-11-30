import api from './serverAgent';

const RESOURCE = 'sharing';

/**
 * Generate a sharable link for patient or doctor users
 * When share a folder, it's sub folder and docs include in this folder will also be shared.
 * @param {Object} item
 * @param {string} item.folderUniqueName
 * @param {boolean} secure - should link receiver provide extra secure info for verify or
 * not when launch this share item
 * @param {string} [shareId] - shareUniqueName is the previously shared path/ID. itemId
 * is expected to be blank
 * @param {string} profileCode
 * @returns {Promise<unknown>}
 */
export const share = ({ folderUniqueName, secure, shareId }, profileCode) => api.post(RESOURCE, 'share', {
  path: `${folderUniqueName}/`,
  secure,
  shareUniqueName: shareId,
}, { accessContext: { profileCode } });

/**
 * Get date details of shared link
 * @param {Object} item
 * @param {string} item.folderUniqueName
 * @returns {Promise<unknown>}
 */
export const query = (folderUniqueName) =>
  api.post(RESOURCE, 'query', {
    path: `${folderUniqueName}/`,
  });

/**
 * Disable shared link
 * @param {string} shareId - shareUniqueName (public UUID) of the shared link
 * @param {string} profileCode
 * @returns {Promise<unknown>}
 */
export const unshare = ({ shareId }, profileCode) =>
  api.post(RESOURCE, 'unshare', {
    shareUniqueName: shareId,
  }, { accessContext: { profileCode } });

export default share;
