/* eslint-disable react/sort-comp, max-classes-per-file */
import * as React from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';

import Text from '/component/Text';

import styles, {
  BOTTOM_PADDING,
  BORDER_HEIGHT,
  LABEL_SIZE,
  LABEL_LINE_HEIGHT,
  LABEL_BOTTOM,
} from './Field.styles';

import globalStyles from '/styles';

class Field extends React.PureComponent {
  static Border = class extends React.PureComponent {
    render() {
      const { active, animation, error } = this.props;

      const borderStyle = [styles.border];

      // The border animation is different on focus and blur
      if (!error) {
        if (active) {
          borderStyle.push({
            transform: [
              {
                scaleX: animation.interpolate({
                  inputRange: [0, 1],
                  // Android can't handle scale = 0. Start the scale animation at 0.01
                  // https://github.com/facebook/react-native/issues/6278
                  outputRange: [0.01, 1],
                }),
              },
            ],
          });
        } else {
          borderStyle.push({
            // NB: if we decide to get rid of this opacity animation we will
            // need to come up with something clever for the scale = 0 issue
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [BORDER_HEIGHT, 0],
                }),
              },
            ],
          });
        }
      } else {
        const backgroundColor = (active) ? globalStyles.palette.teal : globalStyles.palette.grey02;
        borderStyle.push({ backgroundColor });
      }

      return (
        <View style={styles.borderWrapper}>
          <Animated.View style={borderStyle} />
        </View>
      );
    }
  };

  onWrapperPress = () => {
    const { onWrapperPress } = this.props;
    if (onWrapperPress) {
      onWrapperPress();
    }
  };

  render() {
    const {
      label,
      error,
      noError,
      style: styleProp,
      labelInEndPosition,
      animation,
      children,
      labelRelativePosition,
      wrapperStyle,
    } = this.props;

    const labelStyle = [
      styles.label,
      {
        color: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [globalStyles.palette.grey01, globalStyles.palette.grey01],
        }),
        fontSize: labelInEndPosition
          ? LABEL_SIZE
          : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [globalStyles.font.inputFontSize, LABEL_SIZE],
          }),
        lineHeight: labelInEndPosition
          ? LABEL_LINE_HEIGHT
          : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [globalStyles.font.inputLineHeight, LABEL_LINE_HEIGHT],
          }),
        bottom: labelInEndPosition
          ? LABEL_BOTTOM
          : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [BOTTOM_PADDING + BORDER_HEIGHT, LABEL_BOTTOM],
          }),
      },
      labelRelativePosition && {
        position: 'relative',
        top: 0,
      },
    ];

    // If there is an error we will override a bunch of styles
    if (error && error.length && !noError && labelInEndPosition) {
      labelStyle.push({ color: globalStyles.palette.deepBlue });
    }

    const AnimatedText = Animated.createAnimatedComponent(Text.Label);

    return (
      <View style={styleProp}>
        <TouchableWithoutFeedback onPress={this.onWrapperPress}>
          <View>
            {!!label && <AnimatedText style={labelStyle}>{label}</AnimatedText>}
            {!!error && <Text.Label style={styles.error}>{error}</Text.Label>}
            <View style={[styles.wrapper, wrapperStyle]}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Field.defaultProps = {
  disabled: false,
};

export default Field;
