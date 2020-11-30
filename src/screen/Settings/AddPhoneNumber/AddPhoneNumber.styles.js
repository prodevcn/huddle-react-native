import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export const mainStyles = StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xxs,
    paddingHorizontal: globalStyles.padding.md,
  },
  button: {
    marginTop: globalStyles.padding.lg,
  },
  textInput: {
    marginTop: 88,
  },
});

export default mainStyles;
