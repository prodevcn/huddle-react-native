/**
 * This hook will wait until we have an active profile (ie. wait until the
 * user logs in), and then will check to see if the app was launched with an
 * image to upload. It will also register, and clean up, a listener to watch
 * for any deep links into the app while the app is open
 */
import { Image as RNImage } from 'react-native';
import * as mime from 'react-native-mime-types';
import Url from 'url-parse';

import screens from '/screen';
import { itemTypes } from '/screen/Item/PickType';

export const itemDeepLink = async (navigation, originalUrl) => {
  if (!originalUrl) return;

  // On android we will attach some query params that we want to access here
  const parsed = new Url(originalUrl, true);

  let name;
  if (parsed.query.originalFileName) {
    // originalFileName will be present on Android
    name = parsed.query.originalFileName.replace(/ /g, '_');
  } else {
    const fileParts = originalUrl.split('/');
    name = fileParts[fileParts.length - 1];
  }

  // Since we are modifying the URI on Android, the easiest way to get the original
  // path to the item is to just append the original path in the query params
  let url = originalUrl;
  if (parsed.query.originalUrl) {
    url = parsed.query.originalUrl;
  }

  // Figure out what the mime type is based on the filename
  const type = mime.lookup(name);

  if (!type) return;

  if (type.match(/image/i)) {
    RNImage.getSize(url, (width, height) => {
      navigation.push(screens.AddItemStack, {
        initialImages: [{
          uri: url,
          filename: name,
          newImage: true,
          uploadId: (new Date()).getTime(),
          width,
          height,
          mimeType: type,
        }],
        initialType: itemTypes.other,
        generateName: true,
      });
    });
  } else {
    navigation.push(screens.AddItemStack, {
      initialImages: [{
        uri: url,
        filename: name,
        newImage: true,
        uploadId: (new Date()).getTime(),
        mimeType: type,
      }],
      initialType: itemTypes.other,
      generateName: true,
    });
  }
};

export default itemDeepLink;
