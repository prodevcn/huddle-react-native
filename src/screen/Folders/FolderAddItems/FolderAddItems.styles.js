import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  header: {
    backgroundColor: globalStyles.palette.white,
    paddingHorizontal: globalStyles.padding.md,
    paddingTop: 32,
  },
  folder: {
    marginHorizontal: globalStyles.padding.md,
    marginTop: globalStyles.padding.sm,
  },
  search: {
    marginTop: globalStyles.padding.xxs,
    marginHorizontal: globalStyles.padding.md,
  },
});
