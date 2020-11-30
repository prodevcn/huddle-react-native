import { Platform } from 'react-native';
import Config from 'react-native-config';

export const API_ROOT = Config.API_HOST;

export const HUDDLE_TOKEN_API_USERNAME = 'HUDDLE';

export const huddleWebShareUrl = (shareUniqueName) => [
  Config.SHARE_ROOT,
  '/',
  shareUniqueName,
].join('');

/**
 * Header of Add Image screen
 * @type {{manyImages: string, reviewInsuranceCard: string}}
 */
export const itemGalleryTypes = {
  reviewInsuranceCard: 'Review Insurance Card',
  manyImages: 'Add Many Images',
};

/**
 * Document source enums for item added from all the DrFirst apps
 * @type {{huddle: string, link: string, patientPortal: string}}
 */
export const itemInputSources = {
  link: 'linkWebApp',
  huddle: 'huddleNativeApp',
  patientPortal: 'patientPortalApp',
};

/**
 * Display the user facing labels for input sources
 * @param source
 * @returns {string}
 */
export const getInputSource = (source) => {
  switch (source) {
    case itemInputSources.huddle:
      return 'Manually added';

    case itemInputSources.link:
      return 'Imported';

    case itemInputSources.patientPortal:
      return 'Imported from portal'; // TODO danactive replace "portal" with practice name

    default:
      return 'Unknown';
  }
};

/**
 * Our item fields an have a link type which we can (try) to open in the
 * correct application
 *
 * @type {{ tel: string, address: string }}
 */
export const linkTypes = {
  tel: 'tel:',
  address: Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  }),
  url: 'url',
};

// We use this to control when to show/hide overlays in redux
export const overlayAnimationDuration = 250;

// A constant we will pass around in navigation params. Use a constant to
// make sure it is the correct value
export const CONFIRM_BACK = 'CONFIRM_BACK';

// Any other label will be hidden until the field validation is triggered
export const REQUIRED_LABEL = 'Required';

export default {
  API_ROOT,
  HUDDLE_TOKEN_API_USERNAME,
  huddleWebShareUrl,
  itemGalleryTypes,
  itemInputSources,
  linkTypes,
};
