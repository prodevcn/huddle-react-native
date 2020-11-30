import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    marginTop: globalStyles.padding.md - globalStyles.padding.xs,
  },
  card: {
    marginHorizontal: globalStyles.padding.md,
    backgroundColor: globalStyles.palette.coral,
    borderRadius: 12,
    padding: globalStyles.padding.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  list: {
    opacity: 0.4,
  },
});
