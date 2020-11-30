import { Platform, StyleSheet } from 'react-native';

import globalStyles from '/styles';

const WIDTH = 200;
const HEIGHT = 218;

const SECOND_PREVIEW_RIGHT = 8;
const BORDER_RADIUS = 8;

export default StyleSheet.create({
  card: {
    width: WIDTH,
    height: HEIGHT,
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: globalStyles.palette.grey02,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: globalStyles.padding.sm,
    borderTopWidth: 1,
    borderColor: globalStyles.palette.grey02,
    backgroundColor: globalStyles.palette.white,
  },
  footerText: {
    marginLeft: globalStyles.padding.sm,
    flex: 1,
  },
  previewWrapper: {
    flex: 1,
    backgroundColor: globalStyles.palette.grey04,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingHorizontal: globalStyles.padding.md,
    paddingTop: globalStyles.padding.sm,
  },
  preview: {
    flex: 1,
    ...globalStyles.shadows.soft,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    // Elevation doesn't look good in this view when the button is pressed, so just show
    // a border on the previews in Android
    ...Platform.select({
      android: {
        elevation: 0,
        borderColor: globalStyles.palette.grey03,
        borderWidth: 1,
        borderBottomWidth: 0,
      },
    }),
  },
  previewImage: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
  previewDocument: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondPreview: {
    position: 'absolute',
    right: globalStyles.padding.md - SECOND_PREVIEW_RIGHT,
    top: globalStyles.padding.md + 4,
    height: HEIGHT,
    // We need to adjust the width, but not the height, because we can see
    // both the left and right of the previews. We do not need to adjust
    // the height because we cannot see the bottom of the preview
    width: WIDTH - (globalStyles.padding.md * 2 + SECOND_PREVIEW_RIGHT),
    backgroundColor: 'white',
  },
  previewText: {
    padding: globalStyles.padding.xxs,
  },
  previewTextHeader: {
    paddingBottom: 4,
  },
  previewTextField: {
    marginTop: 4,
  },
});
