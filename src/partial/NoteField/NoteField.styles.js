import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  noteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  noteTitle: {
    flex: 1,
    marginLeft: 16,
  },
  noteSubtitle: {
    marginLeft: globalStyles.padding.xs,
  },
  preview: {
    marginTop: globalStyles.padding.md,
  },
});
