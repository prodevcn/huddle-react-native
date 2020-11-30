import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  outer: {
    backgroundColor: globalStyles.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
