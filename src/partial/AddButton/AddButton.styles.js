import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: globalStyles.palette.grey02,
    borderRadius: 8,
    paddingHorizontal: globalStyles.padding.md,
    paddingVertical: globalStyles.padding.sm,
  },
  plus: {
    marginLeft: -12,
    marginTop: globalStyles.padding.sm,
  },
  addText: {
    marginLeft: globalStyles.padding.xs,
  },
});
