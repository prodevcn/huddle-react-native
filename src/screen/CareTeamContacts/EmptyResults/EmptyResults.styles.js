import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.sm,
    paddingHorizontal: globalStyles.padding.md,
  },
  text: {
    textAlign: 'center',
    paddingBottom: globalStyles.padding.xs,
  },
});
