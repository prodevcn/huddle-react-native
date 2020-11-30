import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const SIZE = 24;
const BORDER_RADIUS = 4;
const BORDER_WIDTH = 2;

export const constants = {
  size: SIZE,
  borderRadius: BORDER_RADIUS,
  borderWidth: BORDER_WIDTH,
};

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: globalStyles.padding.sm,
  },
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    borderColor: globalStyles.palette.grey02,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.palette.white,
  },
  rounded: {
    borderRadius: SIZE / 2,
  },
  background: {
    position: 'absolute',
    left: -BORDER_WIDTH,
    top: -BORDER_WIDTH,
    width: SIZE,
    height: SIZE,
    backgroundColor: globalStyles.palette.deepBlue,
  },
  label: {
    marginLeft: 60,
  },
  placeholder: {
    opacity: 0,
  },
});

export const disabledStyles = StyleSheet.create({
  checkbox: {
    backgroundColor: globalStyles.palette.grey03,
  },
  background: {
    opacity: 0,
  },
});
