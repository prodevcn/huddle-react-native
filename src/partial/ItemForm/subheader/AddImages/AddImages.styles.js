import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  header: {
    backgroundColor: globalStyles.palette.grey04,
  },
  headerContent: {
    paddingVertical: globalStyles.padding.md,
    paddingHorizontal: 44,
  },
  image: {
    marginLeft: globalStyles.padding.md,
  },
});
