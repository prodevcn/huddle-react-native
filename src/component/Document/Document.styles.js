import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  name: {
    paddingHorizontal: globalStyles.padding.xxs,
    textAlign: 'center',
    marginTop: globalStyles.padding.xs,
  },
  iconWrapper: {
    height: 44,
    width: 44,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    bottom: globalStyles.padding.xs,
    left: globalStyles.padding.xs,
    right: globalStyles.padding.xs,
  },
});
