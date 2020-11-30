import { StyleSheet, Dimensions } from 'react-native';

import globalStyles from '/styles';
import { cameraHeight } from '/screen/Health/ScanInsuranceCard/ScanInsuranceCard.styles';

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    backgroundColor: globalStyles.palette.white,
  },
  letterbox: {
    backgroundColor: globalStyles.palette.black,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  heading: {
    marginTop: 18,
    marginHorizontal: globalStyles.padding.md,
  },
  retake: {
    alignItems: 'center',
    padding: globalStyles.padding.sm,
  },
  // Make the image the same dimensions as the camera on the ScanInsuranceCard screen
  card: {
    width: screenWidth,
    height: cameraHeight,
  },
});
