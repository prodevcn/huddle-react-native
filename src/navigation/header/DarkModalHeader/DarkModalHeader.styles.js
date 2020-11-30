import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '/styles';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingTop: getStatusBarHeight() + globalStyles.padding.xxs,
  },
  close: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
