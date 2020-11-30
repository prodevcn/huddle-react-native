import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '/styles';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    width,
    height,
    backgroundColor: 'black',
  },
  imageWrapper: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    backgroundColor: globalStyles.color.withOpacity('deepBlue', 0.2),
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: getStatusBarHeight(true),
    left: globalStyles.padding.md,
  },
});
