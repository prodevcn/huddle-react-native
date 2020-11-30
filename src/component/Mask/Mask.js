import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback, View, Animated, Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Svg, Path } from 'react-native-svg';
import isString from 'lodash/isString';

import Icon from '/component/Icon';
import Text from '/component/Text';

import styles from './Mask.styles';
import globalStyles from '/styles';

import { actions, selectors } from '/state/tutorial';

import { TEXT_POSITIONS } from '/tutorial/constants';

const { width, height } = Dimensions.get('window');

const Mask = () => {
  const {
    center,
    radius,
    active,
    currentStep,
    steps = [],
  } = useSelector(selectors.maskSelector);
  const dispatch = useDispatch();
  const [opacityAnimation] = useState(new Animated.Value(0));
  const [textAnimation] = useState(new Animated.Value(0));

  const {
    icon,
    text,
    textPosition = TEXT_POSITIONS.bottom,
    maskPadding = 0,
    onNext,
    onPress,
    maskOffset = {},
  } = steps[currentStep] || {};

  const show = () => {
    Animated.parallel([
      Animated.timing(opacityAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(textAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
        delay: 850,
      }),
    ]).start();
  };

  useEffect(() => {
    if (active && center && radius) {
      show();
    }
  }, [active, center, radius]);

  if (!(active && center && radius)) return null;

  let adjustedRadius = radius;

  const centerX = center.x + (maskOffset.x || 0);
  const centerY = center.y + (maskOffset.y || 0);

  if (maskPadding) {
    adjustedRadius += maskPadding;
  }

  const handleNextPress = () => {
    // onPress can be used if you want a click anywhere on the mask to dismiss
    Animated.parallel([
      Animated.timing(opacityAnimation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 350,
      }),
      Animated.timing(textAnimation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 350,
      }),
    ]).start(() => {
      if (onNext) {
        dispatch(actions.next());
        onNext();
      }
      if (onPress) {
        onPress();
      }
    });
  };

  // Allow users to pass in a string which gets styled, or
  // a component which gets inserted in
  const textChild = isString(text)
    ? (
      <Text.H4 color="white" style={styles.text}>
        {text}
      </Text.H4>
    )
    : text;

  return (
    <TouchableWithoutFeedback onPress={handleNextPress}>
      <Animated.View
        style={[styles.wrapper, { opacity: opacityAnimation }]}
      >
        <Svg
          height={height}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
          style={styles.svg}
        >
          <Path
            d={`
            M0 0
            l0 ${centerY}
            l${centerX - adjustedRadius} 0
            a1,1 0 0,1 ${adjustedRadius * 2} 0
            a1,1 0 0,1 ${-adjustedRadius * 2} 0
            l${-(centerX - adjustedRadius)} 0
            l0 ${height - centerY}
            l${width} 0
            l0 ${-height}
          `}
            fill="rgba(32,48,84,0.97)"
            stroke="none"
          />

        </Svg>
        <Animated.View style={[
          styles.textWrapper,
          textPosition === TEXT_POSITIONS.top && styles.textWrapperTop,
          { opacity: textAnimation },
        ]}
        >
          {!!icon && (
            <Icon
              name={icon}
              color={globalStyles.palette.white}
              style={styles.icon}
            />
          )}
          {textChild}
          {steps.length > 1 && (
            <View style={styles.dots}>
              {steps.map((step, index) => {
                const key = `dot-${index}`;

                return (
                  <View
                    style={[
                      styles.dot,
                      index === 0 && styles.firstDot,
                      index === currentStep && styles.activeDot,
                    ]}
                    key={key}
                  />
                );
              })}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Mask;
