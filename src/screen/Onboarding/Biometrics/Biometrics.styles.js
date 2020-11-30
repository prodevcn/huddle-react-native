import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  subtitle: {
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  skip: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: globalStyles.bottomSpacing,
    marginTop: 18,
  },
});
