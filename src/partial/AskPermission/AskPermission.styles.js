import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: globalStyles.padding.md,
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
  },
  buttonsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: globalStyles.padding.md,
  },
  noThanksButtonText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
