import React, { useEffect } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import useAnimation from '/hook/useAnimation';
import { actions, selectors } from '/state/overlays';

import styles from './OverlayContainer.styles';
import { overlayAnimationDuration } from '/constants/config';

const OverlayContainer = () => {
  const dispatch = useDispatch();
  const overlay = useSelector(selectors.activeOverlaySelector, shallowEqual);
  const transitioning = useSelector(selectors.transitioningSelector);
  const dismissing = useSelector(selectors.dismissingSelector);

  const { animation, toStart, toEnd } = useAnimation({
    duration: overlayAnimationDuration,
  });

  useEffect(() => {
    if (overlay) {
      // Make sure the keyboard disappears before we show our overlay - it will cover the overlay
      Keyboard.dismiss();
      toEnd();
    } else {
      toStart();
    }
  }, [overlay]);

  useEffect(() => {
    if (transitioning || dismissing) {
      toStart();
    }
  }, [transitioning, dismissing]);

  const { Component, ...props } = overlay || {};

  const Overlay = Component || View;
  const { data = {} } = props;

  const handleClose = () => {
    dispatch(actions.dismiss());
  };

  const pointerEvents = overlay ? 'auto' : 'none';

  const overlayStyle = [
    styles.overlay,
    {
      opacity: transitioning ? 0.9 : animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.9],
      }),
    },
  ];

  return (
    <View pointerEvents={pointerEvents} style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={overlayStyle} />
      </TouchableWithoutFeedback>
      <Overlay {...data} animation={animation} />
    </View>
  );
};

export default OverlayContainer;
