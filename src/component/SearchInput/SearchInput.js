import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Icon from '/component/Icon';

import styles from './SearchInput.styles';
import globalStyles from '/styles';

const SearchInput = ({
  style, value, autoFocus, onFocus, onBlur, onChangeText, ...inputProps
}) => {
  const [focused, setFocused] = useState(autoFocus);
  const [animation] = useState(new Animated.Value(value || focused ? 1 : 0));
  const inputRef = useRef(null);

  const handleFocus = () => {
    setFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setFocused(false);
    if (onBlur) onBlur();
  };

  const handleWrapperPress = () => {
    inputRef.current.focus();
  };

  const handleClearPress = () => {
    onChangeText('');
  };

  useEffect(() => {
    Animated.spring(animation, {
      toValue: value || focused ? 1 : 0,
    }).start();
  }, [focused]);

  const wrapperStyle = [
    style,
    styles.wrapper,
    {
      backgroundColor: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [globalStyles.palette.grey04, globalStyles.palette.white],
      }),
      borderColor: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [globalStyles.palette.grey04, globalStyles.palette.grey01],
      }),
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={handleWrapperPress}>
      <Animated.View style={wrapperStyle}>
        <Icon name="search" size={16} />
        <TextInput
          {...inputProps}
          ref={inputRef}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          autoFocus={autoFocus}
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholderTextColor={globalStyles.palette.grey01}
          allowFontScaling={false}
        />

        {!!value && (
          <TouchableOpacity onPress={handleClearPress} style={styles.clear}>
            <IonIcons
              name="ios-close-circle"
              color={globalStyles.palette.grey02}
              size={20}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SearchInput;
