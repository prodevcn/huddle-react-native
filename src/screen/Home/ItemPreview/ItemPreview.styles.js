import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  itemHeader: {
    padding: globalStyles.padding.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    marginRight: 5,
  },
  hint: {
    paddingHorizontal: globalStyles.padding.md,
    paddingTop: globalStyles.padding.md,
    paddingBottom: globalStyles.padding.lg,
    textAlign: 'center',
    color: '#9CA5B8', // This is a one-off colour
  },
  emptyWrapper: {
    backgroundColor: globalStyles.palette.teal,
    marginHorizontal: globalStyles.padding.md,
    marginVertical: globalStyles.padding.xl,
    paddingVertical: globalStyles.padding.sm,
    paddingLeft: globalStyles.padding.md,
    paddingRight: globalStyles.padding.xs,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    maxWidth: 280,
  },
  topParagraph: {
    marginBottom: globalStyles.padding.xs,
  },
  textWrapper: {
    flex: 1,
  },
  securityImage: {
    width: 100,
    height: 100,
  },
});
