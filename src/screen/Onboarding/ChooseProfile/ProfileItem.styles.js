import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    padding: globalStyles.padding.sm,
    backgroundColor: 'rgba(0,0,0,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  text: {
    flex: 1,
  },
});
