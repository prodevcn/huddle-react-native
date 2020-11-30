/**
 * Whenever we fetch a thumbnail from the API we should also cache it locally so we don't need
 * to request it again (until the cache is cleared). We use `rn-fetch-blob` to handle this,
 * and will store the thumbnails in the app's cache.
 *
 * This file contains some helper functions to help us work with cached thumbnails
 */
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import fsConstants from '/constants/fs';

// We will use the cache dir to store thumbnails. The OS can clear them whenever it wants and
// the next time we need a thumbnail, we can just re-fetch it
const dir = fsConstants.directories.thumbnails;

/**
 * Helper function to ensure we are always working with the correct file path
 *
 * @param {string} itemId
 */
const getPath = (itemId) => {
  const path = `${dir}/thumbnail-${itemId}`;

  // Android needs the file:// protocol
  return `${Platform.OS === 'ios' ? '' : 'file://'}${path}`;
};

/**
 * Save a thumbnail to the cache
 *
 * @param {string} itemId
 * @param {string} data
 * `data` should be the base64 encoded image
 */
const saveThumbnail = (itemId, data) => {
  const base64 = data.replace('data:image/jpeg;base64,', '');
  return RNFS.writeFile(getPath(itemId), base64, 'base64');
};

export default {
  getPath,
  saveThumbnail,
};
