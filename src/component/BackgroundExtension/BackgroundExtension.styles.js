import { Dimensions, StyleSheet } from 'react-native';

import globalStyles from '/styles';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  // This background extension will make it appear that the grey background
  // goes on for ever above the scrollview's content, while maintaining
  // a white background on the bottom. We need this cause of scroll bounce
  extension: {
    backgroundColor: globalStyles.palette.grey04,
    height: height / 2,
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
  },
});
