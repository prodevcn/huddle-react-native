import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: globalStyles.palette.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: globalStyles.bottomSpacing,
  },
});

export default styles;
