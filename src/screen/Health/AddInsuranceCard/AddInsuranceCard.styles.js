import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  paragraph: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 48,
  },
  icon: {
    marginBottom: globalStyles.padding.md,
  },
  iconGroup: {
    marginHorizontal: 24,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: globalStyles.palette.teal,
    backgroundColor: 'rgba(70,176,202,0.1)',
    borderWidth: 1,
    borderRadius: 12,
  },
  manualGroup: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
