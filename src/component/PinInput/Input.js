import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import styles from './Input.styles';

const Input = React.forwardRef(({
  value = '',
  onChangeText,
  onFocus,
  ...rest
}, ref) => {
  const [focused, setFocused] = useState(false);

  const handleOnFocus = () => {
    setFocused(true);
    if (onFocus) {
      onFocus();
    }
  };
  const handleOnBlur = () => setFocused(false);

  const handleKeyPress = (event) => {
    const { key } = event.nativeEvent;

    if (key === 'Backspace') {
      onChangeText('');
    } else if (/(^\d+$|^$)/.test(key)) {
      onChangeText(key);
    }
  };

  const handleChangeText = (newValue) => {
    onChangeText(newValue);
  };

  return (
    <View style={[styles.inputWrapper, !value && !focused && styles.unfilledInputWrapper]}>
      <TextInput
        ref={ref}
        style={[styles.input, !value && !focused && styles.unfilledInput]}
        {...rest}
        value={value}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        maxLength={1}
        secureTextEntry
        keyboardType="number-pad"
        selectTextOnFocus
        allowFontScaling={false}
      />
    </View>
  );
});

export default Input;
