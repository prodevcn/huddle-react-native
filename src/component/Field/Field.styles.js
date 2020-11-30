import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const INPUT_HEIGHT = 72;
export const BORDER_HEIGHT = 2;
export const BOTTOM_PADDING = 20;

// These are the style values for a label that has focus.
// If the input has a value we will use these values.
export const LABEL_SIZE = 14;
export const LABEL_LINE_HEIGHT = 16;
export const LABEL_BOTTOM = INPUT_HEIGHT - globalStyles.font.inputFontSize + BORDER_HEIGHT;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    height: INPUT_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: BOTTOM_PADDING + BORDER_HEIGHT,
  },
  borderWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BORDER_HEIGHT,
    backgroundColor: globalStyles.color.withOpacity('grey02', 0.6),
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: globalStyles.palette.teal,
  },
  label: {
    fontSize: globalStyles.font.inputFontSize,
    lineHeight: globalStyles.font.inputLineHeight,
    position: 'absolute',
  },
  error: {
    position: 'absolute',
    color: globalStyles.palette.grey01,
    right: 0,
  },
});
