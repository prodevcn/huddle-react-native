import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: globalStyles.padding.md,
    paddingVertical: globalStyles.padding.xxs,
  },
  icon: {
    marginRight: 12,
  },
});
