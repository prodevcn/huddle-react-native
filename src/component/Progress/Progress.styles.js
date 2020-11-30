import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const HEIGHT = 4;

export default StyleSheet.create({
  wrapper: {
    height: HEIGHT,
    backgroundColor: globalStyles.palette.grey02,
    borderRadius: HEIGHT / 2,
    overflow: 'hidden',
  },
  indicator: {
    height: HEIGHT,
    backgroundColor: globalStyles.palette.teal,
  },
});
