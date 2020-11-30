import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const stylesBySize = StyleSheet.create({
  regular: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  medium: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  large: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});

export const colors = [
  globalStyles.palette.teal,
  globalStyles.palette.coral,
  globalStyles.palette.orange,
];
