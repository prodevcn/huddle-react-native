import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export const WIDTH = 128;
export const HEIGHT = 160;

export default StyleSheet.create({
  card: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: globalStyles.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    ...globalStyles.shadows.soft,
  },
  addIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.palette.teal,
    width: 44,
    height: 44,
    borderRadius: 8,
    marginBottom: globalStyles.padding.xs,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  // These are default dimensions. We will calculate the final height/width
  // to fit the images inside the card whilst maintaining aspect ratio
  image: {
    height: HEIGHT,
    width: WIDTH,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    // pad the button to make the touch area a bit bigger
    paddingBottom: globalStyles.padding.xs,
    paddingLeft: globalStyles.padding.xs,
  },
});
