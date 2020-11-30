import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xxs,
    paddingBottom: globalStyles.bottomSpacing,
  },
  padded: {
    marginHorizontal: globalStyles.padding.md,
  },
});
