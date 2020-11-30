import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  selectAllButton: {
    marginTop: globalStyles.padding.xxs,
    marginHorizontal: globalStyles.padding.md,
    marginBottom: globalStyles.padding.sm,
    backgroundColor: globalStyles.palette.grey04,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxWrapper: {
    padding: 20,
    paddingRight: globalStyles.padding.sm,
  },
});
