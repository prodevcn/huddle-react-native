import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  iconBlock: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.palette.teal,
  },
  content: {
    paddingTop: globalStyles.padding.xs,
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
  },
  headerBlock: {
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.palette.grey04,
  },
  headerText: {
    textAlign: 'center',
    paddingTop: globalStyles.padding.sm,
    paddingBottom: 32,
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 16,
  },
  buttonsBlock: {
    flexDirection: 'row',
    marginBottom: globalStyles.padding.md,
  },
  viewOnlyButton: {
    flex: 1,
    marginRight: 4,
  },
  viewAndExitButton: {
    flex: 1,
    marginLeft: 4,
  },
});
