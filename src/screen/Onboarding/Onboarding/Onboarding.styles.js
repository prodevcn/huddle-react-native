import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '/styles';

export default StyleSheet.create({
  outerWrapper: {
    flex: 1,
    backgroundColor: globalStyles.palette.onboardingBackground,
  },
  content: {
    flex: 1,
    paddingTop: getStatusBarHeight(true) + 10,
  },
  button: {
    paddingBottom: globalStyles.padding.md,
  },
  logo: {
    width: 130,
    marginBottom: globalStyles.padding.sm,
  },
  background: {
    maxHeight: 360,
    maxWidth: 360,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: globalStyles.padding.xs,
  },
  loginButton: {
    marginTop: 16,
    marginBottom: globalStyles.padding.md,
    backgroundColor: globalStyles.palette.grey01,
  },
  tou: {
    alignItems: 'center',
    paddingBottom: Math.max(globalStyles.bottomSpacing, 16),
  },
  touText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
