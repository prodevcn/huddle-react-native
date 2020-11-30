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
  subtitle: {
    paddingVertical: globalStyles.padding.sm,
  },
  inputs: {
    marginTop: 90,
  },
  cta: {
    marginTop: 120,
  },
});

export default styles;
