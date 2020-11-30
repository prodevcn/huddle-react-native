import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  header: {
    paddingVertical: 32,
    paddingHorizontal: globalStyles.padding.md,
  },
  scrollContent: {
    paddingBottom: globalStyles.bottomSpacing,
  },
});
