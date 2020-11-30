import { getBottomSpace } from 'react-native-iphone-x-helper';

import color from './color';
import font from './font';
import padding from './padding';
import palette from './palette';
import shadows from './shadows';

const bottomSpace = getBottomSpace();

export default {
  font,
  color,
  padding,
  palette,
  // On iPhoneX the bottom spacing will be 42 - from the bottom of the screen, not the bar
  // On non-iPhoneX, it will be 24
  bottomSpacing: bottomSpace ? bottomSpace + padding.xxs : padding.md,
  shadows,
};
