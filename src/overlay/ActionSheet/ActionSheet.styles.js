import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  row: {
    justifyContent: 'center',
    height: 44,
  },
  text: {
    paddingLeft: 0,
    textAlign: 'center',
  },
  activeText: {
    color: globalStyles.palette.teal,
  },
  line: {
    height: 1,
    backgroundColor: globalStyles.palette.grey04,
    marginVertical: globalStyles.padding.xxs,
  },
  scrollview: {
    maxHeight: 225,
  },
});
