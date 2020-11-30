import { Platform } from 'react-native';
import palette from './palette';

const soft = Platform.OS === 'ios'
  ? {
    shadowRadius: 3,
    shadowOffset: { height: 1 },
    shadowColor: palette.black,
    shadowOpacity: 0.1,
  }
  : {
    elevation: 2,
  };

export default {
  soft,
};
