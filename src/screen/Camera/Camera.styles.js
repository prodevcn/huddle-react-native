import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BUTTON_HEIGHT } from '/navigation/header/HeaderButton';

import globalStyles from '/styles';

const CLOSE_WIDTH = BUTTON_HEIGHT + globalStyles.padding.md;

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    position: 'absolute',
    marginTop: getStatusBarHeight(true),
    top: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    paddingLeft: globalStyles.padding.md,
    width: CLOSE_WIDTH,
  },
  wrapper: {
    flex: 1,
    backgroundColor: globalStyles.palette.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: globalStyles.bottomSpacing,
    width: 280,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  askPermission: {
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 0,
  },
  page: {
    width,
    height,
    backgroundColor: 'black',
  },
});
