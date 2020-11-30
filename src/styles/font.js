import { Platform } from 'react-native';
import palette from './palette';

const colors = {
  dark: palette.deepBlue,
  white: palette.white,
  medium: palette.grey01,
  light: palette.grey02,
  error: palette.orange,
};

/**
 * iOS and Andoid do **custom** font weights differently. For Android we need to set our
 * fontFamily to be the **exact file name** for the font. iOS, however, supports
 * fontWeight.
 *
 * We return the filename suffix in this function for Android, and
 * the fontWeight for iOS
 *
 * @param {('medium'|'regular')} weight
 */
const getFontWeight = (weight) => {
  switch (weight) {
    case 'regular':
      return Platform.OS === 'ios' ? '400' : 'Regular';
    case 'medium':
      return Platform.OS === 'ios' ? '500' : 'Medium';
    default:
      return 'normal';
  }
};

/**
 *
 * @param {('medium'|'regular')} weight
 */
const getFontFamily = (weight) => {
  let fontFamily;
  let fontWeight;

  if (!getFontWeight(weight)) {
    // eslint-disable-next-line no-console
    console.error(`Invalid font weight: ${weight}. Valid values are 'regular', 'medium'`);
  }

  // In iOS we use the font's family name, as well as a font weight.
  // But in android we need to explictly use the correct font file
  // in our fontFamily (fontWeight is not supported)
  if (Platform.OS === 'ios') {
    fontFamily = 'Lato';
    fontWeight = getFontWeight(weight);
  } else if (weight === 'medium') {
    fontFamily = 'Lato-Bold';
  } else {
    fontFamily = 'Lato-Regular';
  }

  return { fontFamily, fontWeight };
};

/**
 *
 * @param {('dark'|'white'|'medium'|'light'|'error'|string)} color
 * @param {('medium'|'regular')} fontWeight
 * @param {number} fontSize
 * @param {number} [lineHeight]
 */
const fontBuilder = (color, weight, fontSize, lineHeight = Math.round(fontSize * 1.3)) => {
  // If you pass in one of the colors in the colors hash, that color will be used,
  // otherwise we will assume you passed in a valid react native color
  let actualColor = color;
  if (colors[color]) {
    actualColor = colors[color];
  }

  return {
    color: actualColor,
    fontSize,
    lineHeight,
    ...getFontFamily(weight),
  };
};

const font = {
  getFontWeight,
  getFontFamily,
  fontBuilder,
  colors,
  inputFontSize: 18,
  inputLineHeight: 20,
};

export default font;
