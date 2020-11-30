import { Dimensions, StyleSheet } from 'react-native';

import globalStyles from '/styles';

const { width } = Dimensions.get('window');

// Change some sizes depending on screen size. This is the only thing
// we are doing in the app to accommodate smaller screens, but it
// is pretty important: make sure the user can enter their pin
let fontSize = 32;
let lineHeight = 38;
let marginHorizontal = globalStyles.padding.xxs;
let size = 47;

if (width < 350) {
  fontSize = 24;
  lineHeight = 30;
  marginHorizontal = globalStyles.padding.xxs / 1.5;
  size = 36;
} else if (width < 400) {
  fontSize = 30;
  lineHeight = 36;
  size = 40;
}

const styles = StyleSheet.create({
  input: {
    color: globalStyles.palette.deepBlue,
    backgroundColor: globalStyles.palette.white,
    borderRadius: 8,
    fontSize,
    lineHeight,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
  },
  unfilledInput: {
    backgroundColor: globalStyles.palette.grey04,
  },
  inputWrapper: {
    borderColor: globalStyles.palette.teal,
    backgroundColor: globalStyles.palette.white,
    marginHorizontal,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    height: size,
    width: size,
  },
  unfilledInputWrapper: {
    backgroundColor: globalStyles.palette.grey04,
    borderColor: globalStyles.palette.grey04,
  },
});

export default styles;
