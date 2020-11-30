import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: globalStyles.padding.sm,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: globalStyles.palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    color: globalStyles.color.white,
  },
  desciption: {
    color: globalStyles.color.white,
  },
});

export const stylesByType = {
  general: StyleSheet.create({
    wrapper: {
      backgroundColor: globalStyles.palette.grey04,
    },
    iconWrapper: {
      backgroundColor: globalStyles.palette.orange,
    },
  }),
  warning: StyleSheet.create({
    wrapper: {
      backgroundColor: globalStyles.palette.orange,
    },
  }),
  success: StyleSheet.create({
    wrapper: {
      backgroundColor: globalStyles.palette.teal,
    },
  }),
};
