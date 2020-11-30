import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: globalStyles.palette.grey04,
    padding: 20,
    paddingBottom: globalStyles.padding.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
  },
});
