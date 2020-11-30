import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  // We need this to be position relative until we have an image so that
  // the view is the correct size
  thumbnailPlaceholder: {
    position: 'relative',
  },
});
