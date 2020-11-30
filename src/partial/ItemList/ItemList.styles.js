import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xs,
    paddingBottom: globalStyles.bottomSpacing,
  },
  // Note: I am setting paddingTop of the header and paddingBottom of the footer
  // to 16px because we want 32px padding between sections but only 16px for the
  // top padding of the first list item
  dateHeader: {
    paddingTop: globalStyles.padding.sm,
    paddingHorizontal: globalStyles.padding.md,
    backgroundColor: globalStyles.palette.white,
  },
  sectionFooter: {
    paddingBottom: globalStyles.padding.sm,
  },
});
