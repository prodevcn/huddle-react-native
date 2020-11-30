import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  issueButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  issueTitle: {
    flex: 1,
    marginLeft: 16,
  },
  issueSubtitle: {
    marginLeft: globalStyles.padding.xs,
  },
  preview: {
    marginTop: globalStyles.padding.md,
  },
  previewBorder: {
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.palette.grey03,
  },
});
