import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Find dimensions that fit in a bounding box
 * @param {array[width, height]} cardDimensions
 * @param {array[width, height]} boundingBox
 * @returns {array[width, height]}
 */
export const setRatio = (cardDimensions) => (boundingBox) => {
  // todo toadums can we use `util/index.js#restrictImageSize` here?
  const ratio = cardDimensions[0] / cardDimensions[1];

  const maximizedToWidth = [boundingBox[0], boundingBox[0] / ratio];
  const maximizedToHeight = [boundingBox[1] * ratio, boundingBox[1]];

  if (maximizedToWidth[1] > boundingBox[1]) {
    return maximizedToHeight;
  }

  return maximizedToWidth;
};

export const crosshairMarginTop = getStatusBarHeight(true);
const crosshairMarginBottom = 24;
const cameraMarginHorizonal = 32;
export const cameraHeightPercentOfScreen = 0.33; // max height is crosshair ratio tall
export const proportionalOfCard = setRatio([327, 200]); // invision design
export const crosshairDimensions = proportionalOfCard([
  screenWidth - cameraMarginHorizonal - cameraMarginHorizonal,
  screenHeight * cameraHeightPercentOfScreen,
]);

export const cameraHeight = crosshairDimensions[1] + crosshairMarginTop + crosshairMarginBottom;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  contentContainer: {
    marginTop: cameraHeight,
    flex: 1,
    backgroundColor: globalStyles.palette.white,
  },
  cover: {
    backgroundColor: globalStyles.palette.white,
    width: screenWidth,
  },
  crosshair: {
    borderRadius: 32,
    borderWidth: 4,
    borderColor: globalStyles.palette.white,
    width: crosshairDimensions[0],
    height: crosshairDimensions[1],
    position: 'absolute',
    top: crosshairMarginTop,
    left: cameraMarginHorizonal,
  },
  shutterButton: {
    marginBottom: 18,
  },
  cancelButton: {
    fontWeight: 'normal',
  },
});
