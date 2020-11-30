import { Platform, StyleSheet } from 'react-native';

import globalStyles from '/styles';

const SHADOW_SIZE = 32;
const BORDER_RADIUS = 8;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  buttonWrapper: {
    paddingTop: globalStyles.padding.md,
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: globalStyles.palette.white,
    ...Platform.select({
      ios: {
        shadowColor: globalStyles.palette.deepBlue,
        shadowRadius: SHADOW_SIZE,
        shadowOpacity: 0.1,
      },
    }),
  },
  androidShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    height: SHADOW_SIZE,
    top: -SHADOW_SIZE,
  },
  contentContainer: {
    paddingBottom: SHADOW_SIZE,
  },
});
