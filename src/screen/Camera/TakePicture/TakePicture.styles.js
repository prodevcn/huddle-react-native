import { StyleSheet, Dimensions } from 'react-native';
import globalStyles from '/styles';

const { width, height } = Dimensions.get('window');

export const FOCUS_SIZE = 36;

export default StyleSheet.create({
  camera: {
    // Not sure why this zindex is needed, but it is for android
    zIndex: 1,
    height,
    width,
  },
  controls: {
    flex: 1,
  },
  footer: {
    justifyContent: 'space-between',
  },
  shutter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'white',
  },
  focusPoint: {
    width: FOCUS_SIZE,
    height: FOCUS_SIZE,
    borderRadius: FOCUS_SIZE / 2,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,0.15)',
    position: 'absolute',
  },
  previewShutter: {
    backgroundColor: globalStyles.palette.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButton: {
    borderWidth: 0,
  },
});
