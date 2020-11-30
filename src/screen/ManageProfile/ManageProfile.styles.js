import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xs,
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
  },
  sectionTitle: {
    marginTop: 40,
    marginBottom: globalStyles.padding.xxs,
  },
  smallButtons: {
    flexShrink: 0,
    marginTop: globalStyles.padding.sm,
    alignSelf: 'flex-start',
  },
});
