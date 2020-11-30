import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  input: {
    marginHorizontal: globalStyles.padding.md,
  },
  item: {
    minHeight: 44,
    paddingVertical: globalStyles.padding.xs,
    paddingRight: globalStyles.padding.md,
    marginLeft: globalStyles.padding.md,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.palette.grey04,
  },
  contentContainer: {
    paddingBottom: globalStyles.bottomSpacing,
    paddingTop: 32,
  },
});
