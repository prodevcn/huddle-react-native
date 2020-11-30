import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  headerWrapper: {
    paddingVertical: globalStyles.padding.xs,
    paddingHorizontal: globalStyles.padding.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getStatusBarHeight(true),
  },
  input: {
    flex: 1,
    marginRight: 16,
  },
});
