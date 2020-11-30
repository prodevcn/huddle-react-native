import { StyleSheet } from 'react-native';
import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: globalStyles.padding.md,
    paddingTop: globalStyles.padding.xxs,
    paddingBottom: 32,
  },
  label: {
    flex: 1,
    paddingHorizontal: 20,
  },
  switch: {
    flex: 0,
  },
});
