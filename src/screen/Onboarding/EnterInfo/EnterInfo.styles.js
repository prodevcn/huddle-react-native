import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  title: {
    // this plus the 24 margin in the text input gives a margin of 32
    marginBottom: 8,
  },
  input: {
    marginTop: globalStyles.padding.md,
  },
  button: {
    marginTop: 32,
  },
});
