import { useState } from 'react';
import { Animated } from 'react-native';

/**
 * A default ValueField will have the same animation whether it is a single or multiline.
 * This hook just DRYs up the code a bit
 *
 * @param {boolean} animateBlur
 * Do we want to animate when the field blurs?
 * @param {function} afterFocus
 * This function will be called **after** the field focuses
 */
const useValueFieldAnimation = (animateBlur, afterFocus) => {
  const [focused, setFocused] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  // When we click the wrapper show the animation then fire the onPress
  const focus = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      if (afterFocus) afterFocus();
    });
    setFocused(true);
  };

  // When this view focuses, un-set focus
  const blur = () => {
    if (animateBlur) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
      }).start(() => {
        setFocused(false);
      });
    } else {
      animation.setValue(0);
      setFocused(false);
    }
  };

  return {
    animation, focused, focus, blur,
  };
};

export default useValueFieldAnimation;
