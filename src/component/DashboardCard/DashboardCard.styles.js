import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export const WIDTH = 200;
const HEIGHT = 260;

export default StyleSheet.create({
  wrapper: {
    width: WIDTH,
    height: HEIGHT,
    overflow: 'visible',
  },
  card: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 24,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  close: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    height: 12 + 16 + 12, // pad + size + pad
    paddingLeft: 12,
    width: 12 + 16 + 12, // pad + size + pad
  },
  arrow: {
    paddingTop: globalStyles.padding.sm,
    paddingBottom: 32,
  },
});
