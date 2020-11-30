import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    margin: globalStyles.padding.md,
  },
  cardScrollView: {
    paddingHorizontal: globalStyles.padding.md,
  },
  itemListWrapper: {
    backgroundColor: globalStyles.palette.white,
    ...StyleSheet.absoluteFillObject,
  },
});
