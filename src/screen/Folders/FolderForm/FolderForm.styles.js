import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    marginVertical: globalStyles.padding.xxs,
  },
  scrollContent: {
    paddingTop: globalStyles.padding.md,
  },
});
