/* eslint-disable import/prefer-default-export */
import { Platform, Image as RNImage } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import fsConstants from '/constants/fs';

import api from '/api';

import * as types from './images.types';

/**
 * Our write path will be where the image is saved to
 *
 * @param {string} itemId
 */
const getWritePath = (itemId) => `${fsConstants.directories.cache}/${itemId}.jpeg`;

/**
 * We will format our write path to include the file:// protocol on android
 *
 * @param {string} itemId
 */
const getReadPath = (itemId) => {
  let path = getWritePath(itemId);

  // On android we need to append this to the URI so that the image can read it
  if (Platform.OS === 'android') {
    path = `file://${path}`;
  }

  return path;
};

/**
 * Get an s3 preformatted url, then download and cache in the document directory
 *
 * @param {string} itemId
 */
export const downloadItem = (itemId) => async (dispatch) => {
  const uri = await api.document.download(itemId);

  let path = getWritePath(itemId);

  // if the file exists we don't need to download it again
  const fileExists = await RNFS.exists(path);

  if (!fileExists) {
    try {
      await RNFetchBlob
        .config({ path })
        .fetch('GET', uri);
      path = getReadPath(itemId);
    } catch (e) {
      // If something goes wrong, just use the image URI directly. This means the image won't
      // be cached, but at least it will show up
      path = uri;
    }
  }

  return new Promise((resolve, reject) => {
    RNImage.getSize(path, (width, height) => {
      // We will cache the image uri as well as the dimensions
      const data = { uri: path, width, height };

      dispatch({
        type: types.DOWNLOAD_ITEM,
        payload: {
          itemId,
          data,
        },
      });

      resolve(data);
    }, (e) => {
      reject(new Error(e));
    });
  });
};

/**
 * Move a local file to the cache directory so the user doesn't need
 * to download it when they first go to view it
 *
 * @param {object} upload
 * @param {number} upload.width
 * @param {number} upload.height
 * @param {string} upload.uri
 * @param {object} document
 * @param {string} upload.docUniqueName
 */
export const cacheLocalFile = (upload, document) => async (dispatch) => {
  const itemId = document.docUniqueName;
  const { width, height } = upload;

  // This is the url of the file on the device
  let originalUrl = upload.uri;

  // iOS has weird URIs, and RNFS cannot access these `ph://` files without
  // converting them to an `assets-library://` uri
  // Note: I think this `ph://` is new to iOS13, previous versions will already
  // use the `assets-library://` protocol.
  if (originalUrl.match(/ph:\/\//)) {
    const appleId = originalUrl.substring(5, 41);
    const ext = 'JPG';
    originalUrl = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
  }

  // We should use this special function to move files in the asset library
  if (originalUrl.match(/(assets-library):\/\//)) {
    await RNFS.copyAssetsFileIOS(originalUrl, getWritePath(itemId), width, height);
  } else {
    await RNFS.copyFile(upload.uri, getWritePath(itemId));
  }

  const data = { uri: getReadPath(itemId), width, height };

  dispatch({
    type: types.DOWNLOAD_ITEM,
    payload: {
      itemId,
      data,
    },
  });
};
