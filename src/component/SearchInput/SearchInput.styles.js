import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const HEIGHT = 48;

export default StyleSheet.create({
  wrapper: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    borderWidth: 1,
    borderColor: globalStyles.palette.grey01,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: globalStyles.padding.sm,
    backgroundColor: globalStyles.palette.white,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: globalStyles.palette.darkBackground,
  },
  clear: {
    height: HEIGHT,
    justifyContent: 'center',
    paddingLeft: globalStyles.padding.xs,
  },
  clearIcon: {
    height: 20,
    lineHeight: 20,
  },
});
