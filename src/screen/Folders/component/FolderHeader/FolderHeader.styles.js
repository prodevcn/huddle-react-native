import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: globalStyles.palette.grey04,
    padding: globalStyles.padding.md,
    paddingTop: globalStyles.padding.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
  },
});
