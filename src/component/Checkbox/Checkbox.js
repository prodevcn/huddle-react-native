import React, { useState, useEffect } from 'react';

import {
  Easing, Animated, View, TouchableWithoutFeedback,
} from 'react-native';

import Icon from '/component/Icon';
import Text from '/component/Text';

import styles, { disabledStyles, constants } from './Checkbox.styles';

const Checkbox = ({
  onChange,
  disabled,
  checked = false,
  style,
  round,
  label,
  hidden = false,
  testID = 'checkbox',
}) => {
  const [animateBackground] = useState(new Animated.Value(checked ? 1 : 0));
  const [animateCheck] = useState(new Animated.Value(checked ? 1 : 0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animateBackground, {
        toValue: checked ? 1 : 0,
        useNativeDriver: true,
        duration: 250,
      }),
      // Start the check animation a bit after the background
      Animated.timing(animateCheck, {
        toValue: checked ? 1 : 0,
        useNativeDriver: true,
        duration: 150,
        delay: 100,
        easing: Easing.ease,
      }),
    ]).start();
  }, [checked]);

  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const backgroundStyle = [styles.background, disabled && disabledStyles.background];

  if (!disabled) {
    const borderRadius = round ? constants.size / 2 : constants.borderRadius;

    // If we are a square checkbox we will animate from a circle out to a square,
    // and the circle will start just on the inside of the border (that is this scale)
    // A round checkbox will just start as a smaller circle and animate to full
    const scale = round ? 0.7 : (constants.size - constants.borderWidth * 2) / constants.size;

    backgroundStyle.push({
      opacity: animateBackground,
      borderRadius: animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [constants.size / 2, borderRadius],
      }),
      transform: [
        {
          scale: animateBackground.interpolate({
            inputRange: [0, 1],
            outputRange: [scale, 1],
          }),
        },
      ],
    });
  }

  // The checkbox animation is pretty subtle. We animate it up
  // and scale it slightly, and it goes from 0 -> 1 opacity
  // over the first 25% of the animation
  const checkStyle = [
    {
      opacity: animateCheck.interpolate({
        inputRange: [0, 0.25],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: animateCheck.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 0],
          }),
        },
        {
          scale: animateCheck.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
      ],
    },
  ];

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      testID={testID}
    >
      <View style={[styles.wrapper, style]}>
        <View
          style={[
            styles.checkbox,
            disabled && disabledStyles.checkbox,
            round && styles.rounded,
            hidden && styles.placeholder,
          ]}
        >
          <Animated.View style={backgroundStyle} />
          <Icon style={checkStyle} name="checkmark" color="white" size={16} />
        </View>
        {!!label && (
          <Text style={styles.label} color={disabled ? 'medium' : 'dark'}>
            {label}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Checkbox;
