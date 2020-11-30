import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export const mainStyles = StyleSheet.create({
  input: {
    padding: 0,
  },
});

export const stylesBySize = {
  default: StyleSheet.create({
    input: {
      ...globalStyles.font.fontBuilder(
        globalStyles.palette.deepBlue,
        'regular',
        globalStyles.font.inputFontSize,
        globalStyles.font.inputLineHeight,
      ),
    },
  }),
  large: StyleSheet.create({
    input: {
      ...globalStyles.font.fontBuilder(globalStyles.palette.deepBlue, 'regular', 21, 24),
    },
  }),
};

export default mainStyles;
