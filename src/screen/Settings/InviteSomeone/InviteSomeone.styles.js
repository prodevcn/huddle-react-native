import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: globalStyles.padding.md,
  },
  text: {
    marginTop: globalStyles.padding.xs,
    marginBottom: globalStyles.padding.sm,
  },
});

export default styles;
