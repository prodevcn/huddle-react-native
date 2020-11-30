import React from 'react';

import { View } from 'react-native';

import Icon from '/component/Icon';
import Text from '/component/Text';
import styles from './Badge.styles';

import globalStyles from '/styles';

export const BORDER_WIDTH = 2;
export const SIZES = {
  Count: 24,
  Add: 16,
  Default: 20,
  Close: 20,
  Notification: 12,
};

// In iOS rendering a circle with a border radius leaves some antialiasing
// jank. So for the badges I am creating two circles, and putting the
// smaller one on top of the bigger one to create the 2px border
const Badge = ({
  color: colorProp = 'teal',
  size = SIZES.Default,
  hideBorder,
  icon,
  count,
  style = {},
}) => {
  let color = colorProp;
  const outerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  // If we don't want a border, just make the inner (coloured) circle full size
  const innerSize = hideBorder ? size : size - BORDER_WIDTH * 2;
  const innerStyle = {
    width: innerSize,
    height: innerSize,
    borderRadius: innerSize / 2,
  };

  let child;

  if (icon) {
    child = <Icon name={icon} size={10} color={globalStyles.palette.white} />;
  }

  if (count) {
    child = <Text fontSize={14} lineHeight={14} color="white">{count}</Text>;
  }

  if (globalStyles.palette[color]) {
    color = globalStyles.palette[color];
  }

  return (
    <View style={[styles.outer, outerStyle, style]}>
      <View style={[styles.inner, innerStyle, { backgroundColor: color }]}>
        {child}
      </View>
    </View>
  );
};

Badge.Count = ({ style, count }) => (
  <Badge
    count={count}
    size={SIZES.Count}
    style={style}
    color="orange"
  />
);

Badge.Add = ({ style }) => (
  <Badge
    icon="plus"
    size={SIZES.Add}
    style={style}
    hideBorder
  />
);

Badge.Remove = ({ style }) => (
  <Badge
    icon="cross"
    style={style}
    color="orange"
    size={SIZES.Remove}
  />
);

Badge.Notification = ({ style }) => (
  <Badge
    size={SIZES.Notification}
    style={style}
    color="orange"
  />
);

export default Badge;
