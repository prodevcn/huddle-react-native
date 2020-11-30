import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  icon: {
    marginBottom: 16,
  },
  text: {
    width: 232,
    textAlign: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: 'white',
    opacity: 0.2,
  },
  firstDot: {
    marginLeft: 0,
  },
  activeDot: {
    opacity: 1,
  },
  dots: {
    marginTop: 8,
    flexDirection: 'row',
  },
  textWrapper: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 58,
    alignSelf: 'center',
  },
  textWrapperTop: {
    bottom: 'auto',
    top: 68,
  },
});
