import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flex: 1,
    marginHorizontal: 24,
    ...StyleSheet.absoluteFillObject,
  },
  alert: {
    marginBottom: globalStyles.bottomSpacing,
  },
});
