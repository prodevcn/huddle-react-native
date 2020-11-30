import { StyleSheet } from 'react-native';
import globalStyles from '/styles';

export const mainStyles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const stylesByType = {
  default: StyleSheet.create({}),
  primary: StyleSheet.create({
    button: {
      backgroundColor: globalStyles.palette.deepBlue,
    },
    text: {
      color: globalStyles.palette.white,
    },
  }),
  secondary: StyleSheet.create({
    button: {
      backgroundColor: globalStyles.palette.grey01,
    },
    text: {
      color: globalStyles.palette.white,
    },
  }),
  ghost: StyleSheet.create({
    button: {
      backgroundColor: globalStyles.palette.white,
      borderColor: globalStyles.palette.grey02,
      borderWidth: 1,
    },
    text: {
      color: globalStyles.palette.deepBlue,
    },
  }),
  danger: StyleSheet.create({
    button: {
      backgroundColor: globalStyles.palette.orange,
    },
    text: {
      color: globalStyles.palette.white,
    },
  }),
};

export const stylesBySize = {
  small: StyleSheet.create({
    button: {
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 4,
    },
    text: {
      fontSize: 12,
    },
  }),
  medium: StyleSheet.create({
    button: {
      height: 44,
      paddingHorizontal: 24,
    },
    text: {
      fontSize: 14,
    },
  }),
  large: StyleSheet.create({
    button: {
      height: 52,
      paddingHorizontal: 24,
      alignSelf: 'stretch',
    },
    text: {
      fontSize: 16,
    },
  }),
};

export const disabledButton = StyleSheet.create({
  button: {
    backgroundColor: globalStyles.palette.grey04,
  },
  text: {
    color: globalStyles.palette.black,
    opacity: 0.4,
  },
});
