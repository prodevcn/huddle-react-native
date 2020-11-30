import React, { useEffect, useState } from 'react';
import { Easing, Animated, ActivityIndicator } from 'react-native';

import Icon from '/component/Icon';
import globalStyles from '/styles';

import styles from './FullScreenSpinner.styles';

/**
 * This component needs to be mounted all the time, **not conditionally**.
 * It has `pointerEvents="none"`, so it shouldn't ever get in the way
 * of your other components.
 *
 * It accepts two props: `visible` and `success`, both should be
 * initially false - animations happen when they change to true.
 *
 * @param {boolean} visible - when changes to true the loading screen will fade in.
 * @param {boolean} success - when changes to true the spinner will turn into a checkmark to
 * indicate success.
 */
const FullScreenSpinner = ({ visible, success }) => {
  const [visibleAnimation] = useState(new Animated.Value(0));
  const [successAnimation] = useState(new Animated.Value(0));
  // We separate the bounce animation because we don't want the
  // fade to have `easing: bounce` (it looks weird)
  const [successBounceAnimation] = useState(new Animated.Value(0));
  const [activityAnimation] = useState(new Animated.Value(0));

  // When our visible prop changes fade in the background
  // and the ActivityIndicator
  useEffect(() => {
    // I am not sure why, but we can't use a parallel here
    // otherwise the visibleAnimation value gets reverted to 1
    Animated.spring(visibleAnimation, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();

    Animated.timing(activityAnimation, {
      toValue: visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // When our success prop changes we want to fade out the
  // ActivityIndicator, and animate in the checkmark
  useEffect(() => {
    Animated.parallel([
      Animated.timing(activityAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(successAnimation, {
        toValue: success ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(successBounceAnimation, {
        toValue: success ? 1 : 0,
        duration: 450,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start();
  }, [success]);

  // Grow and fade in the success checkmark
  const successStyle = [
    styles.success,
    {
      opacity: successAnimation,
      transform: [
        {
          scale: successBounceAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    },
  ];

  // Grow and fade in the activity indicator
  const activityStyle = {
    opacity: activityAnimation,
    transform: [
      {
        scale: activityAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.wrapper, { opacity: visibleAnimation }]} pointerEvents="none">
      <Animated.View style={activityStyle}>
        <ActivityIndicator size="large" color={globalStyles.palette.deepBlue} />
      </Animated.View>
      <Animated.View style={successStyle}>
        <Icon name="checkmark" size={42} color={globalStyles.palette.white} />
      </Animated.View>
    </Animated.View>
  );
};

export default FullScreenSpinner;
