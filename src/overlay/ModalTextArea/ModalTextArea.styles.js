import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '/styles';

export const buttonBottomMargin = globalStyles.bottomSpacing;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: globalStyles.palette.deepBlue,
    ...StyleSheet.absoluteFillObject,
  },
  box: {
    flex: 1,
    backgroundColor: globalStyles.palette.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: getStatusBarHeight() + globalStyles.padding.lg,
  },
  closeButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginTop: 16,
  },
  continueButton: {
    marginBottom: buttonBottomMargin,
    marginHorizontal: globalStyles.padding.md,
  },
  input: {
    color: globalStyles.palette.darkBackground,
    textAlignVertical: 'top',
    flex: 1,
    paddingHorizontal: globalStyles.padding.md,
    // Need to explicitly set paddingTop/Bottom otherwise there
    // is no effect..
    paddingTop: globalStyles.padding.md,
    paddingBottom: globalStyles.padding.md,
  },
  title: {
    color: globalStyles.palette.darkBackground,
    paddingHorizontal: globalStyles.padding.md,
    marginTop: globalStyles.padding.sm,
    fontSize: 20,
    lineHeight: 26,
  },
});

export default styles;
