import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const styles = StyleSheet.create({
  text: {
    paddingVertical: globalStyles.padding.xs,
  },
  box: {
    paddingHorizontal: globalStyles.padding.md,
    paddingTop: 32,
  },
  buttonBox: {
    paddingHorizontal: globalStyles.padding.md,
    borderTopColor: globalStyles.palette.grey04,
    borderTopWidth: 1,
    paddingTop: 32,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  buttonLeft: {
    marginRight: 20,
  },
});

export default styles;
