import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  card: {
    alignSelf: 'center',
    marginVertical: globalStyles.padding.md,
  },
  itemBottom: {
    borderBottomColor: globalStyles.palette.grey02,
    borderBottomWidth: 1,
  },
});
