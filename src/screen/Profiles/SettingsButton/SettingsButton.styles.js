import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: globalStyles.padding.sm,
    marginHorizontal: globalStyles.padding.md,
    // remove the padding.sm because it is set in the paddingVertical
    marginBottom: globalStyles.bottomSpacing - globalStyles.padding.sm,
  },
  text: {
    paddingHorizontal: globalStyles.padding.sm,
    flex: 1,
  },
});
