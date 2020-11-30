import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    paddingHorizontal: globalStyles.padding.md,
  },
  text: {
    flex: 1,
    paddingLeft: 20,
  },
  firstRow: {
    marginTop: globalStyles.padding.xs,
  },
});
