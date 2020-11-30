import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  continue: {
    marginBottom: globalStyles.padding.sm,
  },
  header: {
    marginTop: globalStyles.padding.xxs,
    marginHorizontal: globalStyles.padding.md,
    marginBottom: 24,
  },
  subtitle: {
    paddingTop: globalStyles.padding.sm,
  },
  loading: {
    marginTop: globalStyles.padding.xxl,
  },
});
