import { Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

const disable = () => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(false);
  }
};

const enable = () => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
  }
};

const init = () => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableAutoToolbar(false);
  }
};

export default {
  init,
  enable,
  disable,
};
