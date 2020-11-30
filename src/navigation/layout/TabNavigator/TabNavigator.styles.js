import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    marginBottom: 2,
  },
  add: {
    backgroundColor: globalStyles.palette.deepBlue,
    borderRadius: 18,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
