import { useState } from 'react';
import { Animated } from 'react-native';

/**
 * useAnimation Config
 *
 * @typedef {Object} useAnimationConfig
 *
 * @property {number} start
 * The value we animate to when calling `toStart()`
 * @property {number} end
 * The value we animate to when calling `toEnd()`
 * @property {number} duration
 * Same as Animated.timing
 * @property {boolean} useNativeDriver
 * Same as Animated.timing
 * @property {boolean} defaultToEnd
 * Do we want the initial value of the animation to be `end`
 */

/**
 * This helper will create a simple animation that goes between two values,
 * `start` and `end`. There are aggressive defaults set because I find myself
 * doing this animation all the time.
 *
 * This hook will return you the `animation` as well as a function to animate
 * in each direction: `toStart` and `toEnd`
 *
 * @param {useAnimationConfig} config
 */
const useAnimation = ({
  start = 0,
  end = 1,
  duration = 250,
  useNativeDriver = true,
  defaultToEnd,
} = {}) => {
  const defaultAnimation = new Animated.Value(defaultToEnd ? end : start);
  const [animation] = useState(defaultAnimation);

  const toStart = (callback) => {
    Animated.timing(animation, {
      toValue: start,
      useNativeDriver,
      duration,
    }).start(callback);
  };

  const toEnd = (callback) => {
    Animated.timing(animation, {
      toValue: end,
      useNativeDriver,
      duration,
    }).start(callback);
  };

  return { animation, toStart, toEnd };
};

export default useAnimation;
