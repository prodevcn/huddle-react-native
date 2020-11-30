import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  h1: {
    marginTop: globalStyles.padding.md,
    marginHorizontal: 32,
    marginBottom: globalStyles.padding.sm,
  },
  bullet1: {
    marginHorizontal: globalStyles.padding.md,
  },
  bullet2: {
    marginTop: globalStyles.padding.sm,
    marginHorizontal: globalStyles.padding.md,
  },
});
