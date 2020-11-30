import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: globalStyles.palette.darkBackground,
  },
  content: {
    paddingTop: globalStyles.padding.xs,
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
  },
  mainContent: {
    flex: 1,
  },
  sectionTitle: {
    color: globalStyles.palette.white,
    paddingVertical: globalStyles.padding.sm,
  },
});
