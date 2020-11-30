import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  bg: {
    backgroundColor: globalStyles.palette.grey04,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: globalStyles.padding.xxs,
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.padding.md,
  },
  heading: {
    marginLeft: 20,
  },
  add: {
    margin: globalStyles.padding.md,
  },
});
