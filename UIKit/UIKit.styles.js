import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: globalStyles.padding.sm,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },

  button: {
    marginBottom: 8,
  },
  header: {
    marginVertical: globalStyles.padding.sm,
  },
});
