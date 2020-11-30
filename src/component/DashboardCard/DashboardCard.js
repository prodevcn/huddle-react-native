import React, { useState } from 'react';
import {
  Easing, Animated, TouchableOpacity, View,
} from 'react-native';

import Text from '/component/Text';
import Icon from '/component/Icon';

import styles, { WIDTH } from './DashboardCard.styles';

import globalStyles from '/styles';

import useTimeout from '/hook/useTimeout';

const DashboardCard = ({
  style,
  title,
  subtitle,
  color = globalStyles.palette.coral,
  onPress,
  onClose,
  showMarginLeft,
  hideClose,
  closeWithoutAnimation,
}) => {
  const [animation] = useState(new Animated.Value(1));

  const wrapperStyle = [styles.wrapper, style, {
    // Animate from opacity 1 -> 0 during the first 25% of the animation. I think
    // this gives a pretty nice effect
    opacity: animation.interpolate({
      inputRange: [0.75, 1],
      outputRange: [0, 1],
    }),

    // When the animation goes from 1 -> 0 we will animate it's margin left to -WIDTH.
    // This will move the next card into it's place nicely.
    marginLeft: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-WIDTH, showMarginLeft ? globalStyles.padding.sm : 0],
    }),
  }];

  const handleClose = () => {
    if (onClose && closeWithoutAnimation) {
      onClose();
      return;
    }

    Animated.timing(animation, {
      toValue: 0,
      duration: 350,
      easing: Easing.ease,
    }).start(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  const handlePress = useTimeout(onPress);

  return (
    <Animated.View style={[wrapperStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.card, { backgroundColor: color }]}
      >
        <View>
          {!hideClose && (
            <TouchableOpacity style={styles.close} onPress={handleClose}>
              <Icon name="cross" color="white" size={16} />
            </TouchableOpacity>
          )}
          <Text.H5 color="white">{subtitle}</Text.H5>
        </View>
        <View>
          <Text.H3 color="white">{title}</Text.H3>
          <Icon color="white" name="arrow-right" style={styles.arrow} size={20} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DashboardCard;
