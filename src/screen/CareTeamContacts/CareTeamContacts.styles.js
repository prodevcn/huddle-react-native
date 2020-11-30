import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: globalStyles.padding.xs,
  },
  input: {
    marginHorizontal: globalStyles.padding.md,
    marginBottom: globalStyles.padding.xs,
  },
  list: {
    paddingBottom: globalStyles.bottomSpacing,
  },
  directContactIcon: {
    backgroundColor: globalStyles.palette.teal,
  },
});
