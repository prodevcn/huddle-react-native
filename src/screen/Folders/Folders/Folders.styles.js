import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: globalStyles.padding.md,
  },
  header: {
    marginVertical: globalStyles.padding.xxs,
  },
  scrollContent: {
    paddingTop: globalStyles.padding.md,
  },
  addButton: {
    marginBottom: globalStyles.padding.md,
  },
  folder: {
    marginBottom: globalStyles.padding.sm,
  },
});
