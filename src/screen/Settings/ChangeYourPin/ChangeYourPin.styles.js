import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const styles = StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xxs,
    alignItems: 'flex-start',
    paddingHorizontal: globalStyles.padding.md,
  },
  scrollView: {
    flex: 1,
  },
  instruction: {
    paddingVertical: globalStyles.padding.sm,
  },
  inputs: {
    marginTop: 90,
  },
});

export default styles;
