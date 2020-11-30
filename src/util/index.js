import RNFS from 'react-native-fs';
import isArray from 'lodash/isArray';

import ImageResizer from './react-native-image-resizer';

import keyboardManager from './keyboardManager';

keyboardManager.init();

export { default as validations } from './validations';

export { default as format } from './format';
export { default as sort } from './sort';
export { default as secureStorage } from './secureStorage';
export { default as itemsHelper } from './itemsHelper';
export { default as thumbnailsHelper } from './thumbnailsHelper';

/**
 * Given a string, capitalize the first character
 *
 * @param {string} str
 */
export { default as capitalize } from 'lodash/capitalize';

/**
 * Given a string, add either a `'s` or `'` if the word ends in an `s` already
 *
 * @param {string} str
 */
export const pluralizeName = (str) => `${str}${str[str.length - 1] === 's' ? '\'' : '\'s'}`;

/**
 * Given a string, add together the alphabetical index of each character
 * @param {string} str
 */
export const getStringSum = (str = '') => {
  let sum = 0;
  for (let i = 0; i < str.length; i += 1) {
    sum += str.charCodeAt(i);
  }

  return sum;
};

/**
 * Normalize the given array and return an array of the ids
 * (as extracted via `key`) and a hash of {[id]: item}
 *
 * @param {array} items an array of items you'd like to normalize
 * @param {string} key the id of your items
 *
 */
export const normalize = (items, key = 'id') => {
  if (!isArray(items)) {
    // eslint-disable-next-line no-console
    console.error('Items must be an array');
    return items;
  }
  const list = [];
  const hash = {};

  items.forEach((item) => {
    list.push(item[key]);
    hash[item[key]] = item;
  });

  return { list, hash };
};

/**
 * Given an image URI, create a smaller thumbnail with `size`
 *
 * @param {string} uri
 * @param {number} size
 * @param {boolean} landscape
 */
export const generateThumbnail = async (uri, size = 48, landscape) => {
  // We are not going to have square images, and we want the smaller side
  // to be equal to size. This way when we set our image to have size=`size`
  // the smaller edge will be the right size, and the larger edge will
  // be cropped. Size will actually be @3x, so we multiply by 3
  // (smaller edge is the **width for portrait images** and **height for landscape**)
  let width;
  let height;

  if (landscape) {
    height = size * 3;
    width = 9999;
  } else {
    width = size * 3;
    height = 9999;
  }

  const img = await ImageResizer.createResizedImage(uri, width, height, 'JPEG', 100);
  const imageData = await RNFS.readFile(img.uri, 'base64');
  return imageData;
};

/**
 * Restrict the `imageSize` to fit inside the `boxSize`, maintaining aspect ratio.
 *
 * If our box is [screenWidth, screenHeight], and our image is landscape, we would
 * resize the image so that the width = screenWidth. Then we would scale down the
 * height of the image by the same ratio (imageSize.width / boxSize.width).
 * The opposite is true for a portrait image
 *
 * @param {object} imageSize
 * @param {number} imageSize.width
 * @param {number} imageSize.height
 * @param {object} boxSize
 * @param {number} boxSize.width
 * @param {number} boxSize.height
 */
export const restrictImageSize = (imageSize, boxSize) => {
  let size = { width: boxSize.width, height: boxSize.height };

  // This logic only works if we define both a width and height
  // for the imageSize
  if (imageSize.width && imageSize.height) {
    if (imageSize.width > imageSize.height) {
      size = {
        width: boxSize.width,
        height: imageSize.height * (boxSize.width / imageSize.width),
      };
    } else if (imageSize.height > imageSize.width) {
      size = {
        height: boxSize.height,
        width: imageSize.width * (boxSize.height / imageSize.height),
      };
    }
  }

  return size;
};

/**
 * Return an array, by checking if `arg` is an array, otherwise
 * return it as the only element in a new array
 * @param {any} arg
 */
export const asArray = (arg) => (isArray(arg) ? arg : [arg]);
