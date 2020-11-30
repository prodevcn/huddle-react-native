import TouchID from 'react-native-touch-id';

const authenticate = (text = 'Login to the Huddle', config = {}) => TouchID.authenticate(text, {
  fallbackLabel: '',
  passcodeFallback: false,
  ...config,
});

export default {
  authenticate,
};
