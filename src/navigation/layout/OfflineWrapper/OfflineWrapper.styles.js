import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '/styles';

const extraTopSpacing = 20;

export const HEIGHT = getStatusBarHeight(true) + extraTopSpacing;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEIGHT,
    backgroundColor: globalStyles.palette.orange,
    paddingBottom: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
  },
  offlineContent: {
    marginTop: extraTopSpacing,
  },
});
