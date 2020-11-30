import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingTop: 40,
    alignItems: 'center',
  },
  avatar: {
    marginRight: globalStyles.padding.sm,
  },
  button: {
    backgroundColor: globalStyles.palette.grey01,
    paddingHorizontal: globalStyles.padding.md,
  },
});
