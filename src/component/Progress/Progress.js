import React, { useState, useEffect } from 'react';

import { Animated, View } from 'react-native';

import styles from './Progress.styles';

const Progress = ({ progress, style }) => {
  const [animation] = useState(new Animated.Value(0));
  const [width, setWidth] = useState(0);
  useEffect(() => {
    Animated.spring(animation, {
      toValue: progress,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const handleLayout = (e) => {
    setWidth(e.nativeEvent.layout.width);
  };

  // We will nest an animated view inside a view which has overflow: hidden.
  // As our progress increases we will animate the inner view to the right,
  // making it appear to fill the outer view.
  const progressStyle = [
    styles.indicator,
    {
      width,
      transform: [{
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        }),
      }],
    },
  ];

  return (
    <View style={[styles.wrapper, style]} onLayout={handleLayout}>
      <Animated.View style={progressStyle} />
    </View>
  );
};

export default Progress;
