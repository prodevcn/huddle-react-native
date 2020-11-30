/**
 * This component opens up a fullscreen view that we can render an image
 * into. It supports pinch zoom and pan gestures. It is a little confusing
 * how they work, so I thought I'd write some high level notes:
 *
 * Both pan and pinch gestures use a **base** animation as well as a
 * **last** ref. These values are used to ensure a smooth animation
 * after the user stops the gesture. Each time rn-gesture-handler
 * starts tracking a gesture, its value starts at 0. So if you didn't
 * use this base value, your component would start at it's original
 * state each time you start a gesture.
 *
 * ## Base
 *
 * For example, lets say you are panning:
 * - Pan 5px to the right (image will move from x = 0 -> 5)
 * - Stop the gesture (image will remain at x = 5)
 * - Pan 5px to the right (image will move from x = 0 -> 5)
 *
 * But the behaviour we would want in the second pan is for the
 * image to move from x = 5 -> 10.
 *
 * Using the **baseX** value, we would set it to 5 after the first
 * gesture is finished and use this as the base for the second gesture
 * using `Animated.add`. Note: For the scale animation we need to do
 * `Animated.multiply`, not add.
 *
 * ## Last
 *
 * **last** is more straight forward - it just keeps track of the value
 * after a so that we can always set our **base** to the correct value
 * after our gestures _finish_ (hence why we call it "last").
 *
 * We use a ref because we don't want the state to update when these
 * values change
 */

import React, { useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, Animated } from 'react-native';
import { State, PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import Icon from '/component/Icon';
import { actions as overlayActions } from '/state/overlays';

import styles from './FullScreenImage.styles';

const { width } = Dimensions.get('window');

const FullScreenImage = ({
  uri,
  animation,
  dimensions,
}) => {
  const dispatch = useDispatch();
  // react-native-gesture-handler doesn't have perfect support for nested
  // gesture handlers, so we need to pass a ref of the inner handler to
  // the outer handler so that it can juggle them correctly
  const pinchRef = useRef(null);

  // The image is going to be fullsized, so initially when we show the image
  // we will scale it down to fit in the screen
  const initialScale = (width - 20) / dimensions.width;

  // ===============
  // Scale
  // ===============
  const [baseScale] = useState(new Animated.Value(initialScale));
  const [pinchScale] = useState(new Animated.Value(1));
  const lastScale = useRef(null);
  lastScale.current = initialScale;

  // Use Animated.event to natively handle the gestures. While a use is dragging
  // their fingers the animations will happen natively, without any JS. Once the
  // gestures end, JS will take over again.
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true },
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };

  const scale = Animated.multiply(baseScale, pinchScale);

  // ===============
  // Pan
  // ===============
  const lastX = useRef(null);
  const lastY = useRef(null);

  const [baseX] = useState(new Animated.Value(0));
  const [touchX] = useState(new Animated.Value(0));

  const [baseY] = useState(new Animated.Value(0));
  const [touchY] = useState(new Animated.Value(0));

  lastX.current = 0;
  lastY.current = 0;

  const onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastX.current += event.nativeEvent.translationX;
      lastY.current += event.nativeEvent.translationY;

      baseX.setValue(lastX.current);
      baseY.setValue(lastY.current);

      touchX.setValue(0);
      touchY.setValue(0);
    }
  };

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: touchX, translationY: touchY } }],
    { useNativeDriver: true },
  );

  const translateX = Animated.divide(Animated.add(baseX, touchX), scale);
  const translateY = Animated.divide(Animated.add(baseY, touchY), scale);

  const imageStyle = [styles.image, dimensions, {
    transform: [
      { perspective: 200 },
      { scale },
      { translateX },
      { translateY },
    ],
  }];

  const handleClose = () => {
    dispatch(overlayActions.dismiss());
  };

  return (
    <Animated.View style={[styles.wrapper, { opacity: animation }]}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStateChange}
        simultaneousHandlers={pinchRef}
      >
        <Animated.View style={styles.imageWrapper}>
          <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onPinchHandlerStateChange}
            ref={pinchRef}
          >
            <Animated.View style={styles.imageWrapper}>
              <Animated.Image
                source={{ uri }}
                style={imageStyle}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>

      <TouchableOpacity
        style={styles.close}
        onPress={handleClose}
      >
        <Icon name="cross" color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FullScreenImage;
