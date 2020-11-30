import { StyleSheet } from 'react-native';

import { constants as checkboxConsants } from '/component/Checkbox';

import { SIZES as BADGE_SIZES, BORDER_WIDTH as BADGE_BORDER_WIDTH } from '/component/Badge';

import globalStyles from '/styles';

const ICON_SIZE = 48;
const SQUARE_BORDER_RADIUS = 8;
const ICON_MARGIN = 20;
const UNDERLINE_MARGIN = 4;

const PADDING = globalStyles.padding.md;

const UNDERLINE_LEFT = ICON_SIZE + ICON_MARGIN + PADDING - UNDERLINE_MARGIN;

export const constants = {
  iconSize: ICON_SIZE,
  borderRadius: SQUARE_BORDER_RADIUS,
};

export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING,
  },
  iconWrapper: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: globalStyles.palette.grey04,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: ICON_MARGIN,
  },
  iconWrapperSquare: {
    borderRadius: SQUARE_BORDER_RADIUS,
  },
  labelWrapper: {
    marginRight: ICON_MARGIN,
    flex: 1,
  },
  labelWrapperNoAction: {
    marginRight: 0,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: UNDERLINE_LEFT,
    right: UNDERLINE_MARGIN,
    height: 1,
    backgroundColor: globalStyles.palette.grey04,
  },
  selectUnderline: {
    left: UNDERLINE_LEFT - checkboxConsants.size,
  },
  description: {
    marginTop: 4,
  },
  notification: {
    position: 'absolute',
    top: PADDING - BADGE_BORDER_WIDTH,
    left: PADDING + ICON_SIZE + BADGE_BORDER_WIDTH - BADGE_SIZES.Notification,
  },
  underlineNoPreview: {
    left: globalStyles.padding.md,
  },
});
