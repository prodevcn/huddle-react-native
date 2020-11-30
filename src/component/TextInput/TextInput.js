import React, { useEffect, useRef, useState } from 'react';
import { Animated, TextInput as RNTextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import Field from '/component/Field';

import useFormFieldLabel from '/hook/useFormFieldLabel';
import textInputStyles, { stylesBySize } from './TextInput.styles';
import globalStyles from '/styles';

const TextInput = ({
  onChangeText,
  onFocus,
  onBlur,
  getInputRef,
  label,
  labelInEndPosition,
  type,
  autoCorrect = false,
  autoCapitalize = 'none',
  errorMessage,
  maskProps = {},
  placeholder: placeholderProp,
  size = 'default',
  style,
  value,
  allowFontScaling = false,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  // We store the placeholder in state because we don't want the placeholder to
  // render behind the label (the label would overlap it and it would look bad).
  // As we animate the label up/down we control whether or not the placeholder
  // is visible
  const [placeholder, setPlaceholder] = useState(label ? '' : placeholderProp);

  const inputRef = useRef(null);
  const setRef = (incomingRef) => {
    if (!incomingRef) return;

    let ref = incomingRef;
    // If we have a masked input we need to call getElement to get
    // the ref to the raw TextInput
    if (incomingRef.getElement) {
      ref = incomingRef.getElement();
    }

    inputRef.current = ref;

    if (getInputRef) {
      getInputRef(ref);
    }
  };

  // This function handles both directions of the animation
  // We set `focused` state to track which direction
  // the animation is going.
  useEffect(() => {
    // When we blur the input, always un-set the placeholder
    if (!focused) {
      setPlaceholder('');
    }

    Animated.timing(animation, {
      toValue: focused ? 1 : 0,
      duration: 200,
      // don't use the nativeDriver cause we want to animate color
    }).start(() => {
      // After the label animates up, we show the placeholder if there is one
      if (focused && placeholderProp) {
        setPlaceholder(placeholderProp);
      }
    });
  }, [focused]);

  const {
    allowErrorMessage,
    handleTextChange,
  } = useFormFieldLabel({
    onChangeText,
    value,
  });

  const handleOnFocus = () => {
    if (onFocus) {
      onFocus();
    }
    setFocused(true);
  };

  const handleOnBlur = () => {
    if (onBlur) {
      onBlur();
    }
    setFocused(false);
  };

  const handleOnPress = () => inputRef.current.focus();

  const isMask = maskProps.type;
  const TextComponent = isMask ? TextInputMask : RNTextInput;

  return (
    <Field
      label={label}
      style={style}
      onWrapperPress={handleOnPress}
      animation={animation}
      labelInEndPosition={value || labelInEndPosition}
      error={allowErrorMessage(errorMessage)}
    >
      <TextComponent
        {...rest}
        {...maskProps}
        ref={setRef}
        secureTextEntry={type === 'password'}
        onChangeText={handleTextChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        value={value}
        style={[textInputStyles.input, stylesBySize[size].input]}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        placeholderTextColor={globalStyles.palette.grey01}
        allowFontScaling={allowFontScaling}
      />

      <Field.Border
        animation={animation}
        active={focused}
        error={errorMessage && errorMessage.length}
      />
    </Field>
  );
};

export default TextInput;
