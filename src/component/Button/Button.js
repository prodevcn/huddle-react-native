import * as React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import Text from '/component/Text';

import useTimeout from '/hook/useTimeout';

import {
  mainStyles,
  stylesByType,
  stylesBySize,
  disabledButton,
} from './Button.styles';

import globalStyles from '/styles';

/**
 * @typedef {('primary'|'secondary'|'ghost'|'danger')} ButtonTypes
 * @typedef {('small'|'medium'|'large')} ButtonSize
 *
 * @param {Object} props
 * @param {ButtonSize} [props.size]
 * @param {ButtonTypes} [props.type]
 * @param {boolean} [props.disabled]
 * @param {function} [props.onPress]
 * @param {string} props.text
 * @param {string} [props.style]
 * @param {string} [props.textStyle]
 */
const Button = ({
  size = 'medium',
  type = 'primary',
  onPress,
  text,
  disabled = false,
  style,
  textStyle,
  loading,
  testID,
}) => {
  let Wrapper = TouchableOpacity;

  const touchable = !(loading || disabled);

  const handlePress = useTimeout(onPress);

  if (!touchable) {
    Wrapper = View;
  }

  const loadingColour = type === 'ghost'
    ? globalStyles.palette.deepBlue
    : globalStyles.palette.white;

  return (
    <Wrapper
      onPress={(touchable) ? handlePress : undefined}
      testID={testID}

      style={[
        mainStyles.button,
        stylesBySize[size].button,
        stylesByType[type].button,
        disabled && disabledButton.button,
        style,
      ]}
    >
      {!loading && (
        <Text
          style={[
            stylesByType[type].text,
            stylesBySize[size].text,
            disabled && disabledButton.text,
            textStyle,
          ]}
          numberOfLines={1}
          weight={type === 'ghost' ? 'regular' : 'medium'}
          lineHeight={24}
        >
          {text}
        </Text>
      )}
      {!!loading && (
        <ActivityIndicator
          color={loadingColour}
          testID="loading"
        />
      )}
    </Wrapper>
  );
};

export default Button;
