import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const styles = StyleSheet.create({
  h2: {
    paddingHorizontal: globalStyles.padding.md,
    marginBottom: 16,
    marginTop: 40,
  },
  bodyText: {
    paddingHorizontal: globalStyles.padding.md,
    marginVertical: 28,
  },
  locationText: {
    color: globalStyles.palette.deepBlue,
  },
  dateText: {
    color: globalStyles.palette.grey01,
  },
  shareButton: {
    marginBottom: 18,
  },
  disableButton: {
    fontWeight: 'normal',
  },
});

export default styles;
