import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const ILLUS_WIDTH = 180;
const ILLUS_DIMENSIONS = {
  WIDTH: 676,
  HEIGHT: 619,
};

export default StyleSheet.create({
  scrollContent: {
    paddingBottom: globalStyles.bottomSpacing,
  },
  header: {
    paddingTop: 32,
    alignItems: 'center',
  },
  headerText: {
    maxWidth: 274,
    textAlign: 'center',
  },
  recentItemsLabel: {
    borderTopWidth: 1,
    borderTopColor: globalStyles.palette.grey03,
    alignSelf: 'stretch',
    marginBottom: globalStyles.padding.sm,
    paddingHorizontal: globalStyles.padding.md,
    marginTop: 40,
    paddingTop: 40,
  },
  illustration: {
    width: ILLUS_WIDTH,
    // Maintain the aspect ratio of the original image
    height: (ILLUS_WIDTH / ILLUS_DIMENSIONS.WIDTH) * ILLUS_DIMENSIONS.HEIGHT,
    marginBottom: globalStyles.padding.md,
  },
  headerButton: {
    marginTop: 28,
    paddingHorizontal: 44,
  },
  addItem: {
    width: 96,
  },
});
