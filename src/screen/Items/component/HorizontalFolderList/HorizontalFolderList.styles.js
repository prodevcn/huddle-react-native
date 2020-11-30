import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const ITEM_PADDING = 16;

export default StyleSheet.create({
  scrollContent: {
    paddingLeft: globalStyles.padding.md - ITEM_PADDING,
    paddingRight: globalStyles.padding.md,
    paddingBottom: 40,
  },
  folder: {
    marginLeft: ITEM_PADDING,
  },
  header: {
    margin: globalStyles.padding.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeader: {
    marginLeft: globalStyles.padding.md,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    marginRight: globalStyles.padding.xxs,
  },
  addButton: {
    marginHorizontal: globalStyles.padding.md,
    paddingVertical: globalStyles.padding.xxs,
    marginBottom: globalStyles.padding.md,
  },
});
