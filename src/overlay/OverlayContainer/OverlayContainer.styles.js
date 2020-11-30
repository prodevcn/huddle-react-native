import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  overlay: {
    backgroundColor: globalStyles.palette.deepBlue,
    ...StyleSheet.absoluteFillObject,
  },
});
