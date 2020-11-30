import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.color.withOpacity('white', 0.97),
    ...StyleSheet.absoluteFillObject,
  },
  success: {
    position: 'absolute',
    width: 84,
    height: 84,
    backgroundColor: globalStyles.palette.teal,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
