import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    paddingHorizontal: globalStyles.padding.md,
    paddingTop: globalStyles.padding.xxs,
  },
  subtitle: {
    marginTop: 16,
  },
  input: {
    marginTop: globalStyles.padding.md,
  },
  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
  },
});
