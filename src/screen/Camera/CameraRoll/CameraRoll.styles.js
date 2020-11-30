import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BUTTON_HEIGHT } from '/navigation/header/HeaderButton';

import globalStyles from '/styles';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    height,
    width,
    backgroundColor: globalStyles.palette.black,
  },
  header: {
    height: getStatusBarHeight(true) + BUTTON_HEIGHT,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: width / 3,
    height: width / 3,
  },
  imageWrapper: {
    borderBottomWidth: 4,
    borderBottomColor: globalStyles.palette.black,
  },
  border: {
    borderRightWidth: 4,
    borderRightColor: globalStyles.palette.black,
    borderLeftWidth: 4,
    borderLeftColor: globalStyles.palette.black,
  },
  loading: {
    // Center the loader
    ...StyleSheet.absoluteFillObject,
  },
});
