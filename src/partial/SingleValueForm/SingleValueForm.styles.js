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
  instruction: {
    width: 300,
    paddingTop: globalStyles.padding.sm,
    paddingBottom: 24,
  },
  inputNoSubtitle: {
    marginTop: 88,
  },
  cta: {
    marginTop: globalStyles.padding.md,
  },
});

export default mainStyles;
