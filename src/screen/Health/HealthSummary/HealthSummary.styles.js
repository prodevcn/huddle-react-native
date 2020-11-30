import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  bg: {
    backgroundColor: globalStyles.palette.coral,
    marginBottom: globalStyles.padding.sm,
  },
  avatar: {
    backgroundColor: globalStyles.palette.grey01,
    marginLeft: globalStyles.padding.md,
    marginBottom: globalStyles.padding.sm,
    marginTop: globalStyles.padding.sm,
  },
  h1: {
    marginLeft: globalStyles.padding.md,
  },
  dob: {
    marginBottom: 32,
    marginLeft: globalStyles.padding.md,
  },
  emptyList: {
    marginTop: 0,
  },
});
