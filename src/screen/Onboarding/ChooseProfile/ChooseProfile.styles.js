import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: globalStyles.palette.deepBlue,
    paddingHorizontal: 0,
  },
  scrollContent: {
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
  },
  subtitle: {
    marginTop: 40,
    marginBottom: globalStyles.padding.md,
  },
  profileItem: {
    marginBottom: globalStyles.padding.sm,
  },
});
