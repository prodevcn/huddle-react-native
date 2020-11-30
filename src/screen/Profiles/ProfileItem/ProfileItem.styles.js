import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: globalStyles.padding.sm,
    marginBottom: globalStyles.padding.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    alignItems: 'center',
    borderRadius: 8,
  },
  active: {
    backgroundColor: globalStyles.palette.white,
  },
  fullNameText: {
    paddingHorizontal: globalStyles.padding.sm,
    flex: 1,
    color: globalStyles.palette.white,
  },
  activeFullNameText: {
    color: globalStyles.palette.deepBlue,
  },
});
