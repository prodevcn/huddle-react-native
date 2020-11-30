import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: globalStyles.padding.sm,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
  iconBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.palette.teal,
    marginHorizontal: globalStyles.padding.xxs,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  text: {
    paddingHorizontal: globalStyles.padding.sm,
    flex: 1,
  },
});
