import { Platform } from 'react-native';

export const FACE_ID = 'FaceID';
export const FINGERPRINT = 'fingerprint';

// Nice human readable strings to render to the screen
export default {
  [FACE_ID]: Platform.OS === 'ios' ? 'Face ID' : 'Face Unlock',
  [FINGERPRINT]: 'Fingerprint',
};
