import api from './serverAgent';

const RESOURCE = 'folder';

/**
 * Get all folders for the given `profileCode`
 *
 * @param {string} profileCode
 */
export const list = (profileCode) => api.post(RESOURCE, 'list', {}, { accessContext: { profileCode } });

/**
 *
 * @param {object} data
 * @param {string} data.displayName
 * @param {string} data.layoutPath
 * @param {string} data.custom
 * @param {[string]} data.tags
 * @param {string} profileCode
 */
export const create = (data = {}, profileCode) => {
  const payload = {
    ...data,
    custom: JSON.stringify(data.custom || {}),
  };

  return api.post(RESOURCE, 'create', payload, { accessContext: { profileCode } });
};

/**
 *
 * @param {object} data
 * @param {string} data.displayName
 * @param {string} profileCode
 */
export const update = (data = {}, profileCode) => {
  const payload = {
    ...data,
    custom: JSON.stringify(data.custom || {}),
  };

  return api.post(RESOURCE, 'update', payload, { accessContext: { profileCode } });
};


/**
 * Upload one or more documents to the folder with `folderUniqueName`
 * @param {string} folderUniqueName
 * @param {[string]} documents
 * `documents` should be an array of **docUniqueName**
 */
export const addDoc = (folderUniqueName, documents, profileCode) => api.post(RESOURCE, 'addDoc', {
  folderUniqueName,
  docUniqueName: documents,
}, { accessContext: { profileCode } });

/**
 * Remove the given folder
 * @param {string} folderUniqueName
 */
export const remove = (folderUniqueName, profileCode) => api.post(RESOURCE, 'remove', { folderUniqueName }, { accessContext: { profileCode } });

/**
 * Remove the given `docUniqueName`s
 * @param {[string]} docUniqueName
 * `documents` should be an array of **docUniqueName**
 * @param {string} [folderUniqueName]
 * `folderUniqueName` is an optional paramter. If provided it will only remove those documents
 * from that folder. If it is **not** provided the item will be removed from **all** folders.
 */
export const removeDoc = (documents, profileCode, folderUniqueName) => {
  const data = { folderUniqueName, docUniqueName: documents };
  return api.post(RESOURCE, 'removeDoc', data, { accessContext: { profileCode } });
};
