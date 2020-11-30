import React, { useState, useRef, useEffect } from 'react';
import { NavigationEvents } from 'react-navigation';
import { Platform, Keyboard, View } from 'react-native';

import Input from './Input';
import styles from './PinInput.styles';

function clearFocusOnDigit(currentValue, digitRef) {
  if (currentValue === '') digitRef.current.focus();
}

const PinInput = ({ blurOnSubmit, handleSubmit, style }) => {
  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [digit3, setDigit3] = useState();
  const [digit4, setDigit4] = useState();
  const [digit5, setDigit5] = useState();
  const [digit6, setDigit6] = useState();

  useEffect(() => {
    if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6) {
      handleSubmit(`${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`);
      if (blurOnSubmit) {
        Keyboard.dismiss();
      }
    }
  }, [digit1, digit2, digit3, digit4, digit5, digit6]);

  const textInput1 = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);
  const textInput5 = useRef(null);
  const textInput6 = useRef(null);

  const handleChangeDigit1 = (currentValue) => {
    setDigit1(() => currentValue);

    if (currentValue) {
      textInput2.current.focus();
    }
  };

  const handleChangeDigit2 = (currentValue) => {
    clearFocusOnDigit(currentValue, textInput1);
    setDigit2(() => currentValue);

    if (currentValue) {
      textInput3.current.focus();
    }
  };

  const handleChangeDigit3 = (currentValue) => {
    clearFocusOnDigit(currentValue, textInput2);
    setDigit3(() => currentValue);

    if (currentValue) {
      textInput4.current.focus();
    }
  };

  const handleChangeDigit4 = (currentValue) => {
    clearFocusOnDigit(currentValue, textInput3);
    setDigit4(() => currentValue);

    if (currentValue) {
      textInput5.current.focus();
    }
  };

  const handleChangeDigit5 = (currentValue) => {
    clearFocusOnDigit(currentValue, textInput4);
    setDigit5(() => currentValue);

    if (currentValue) {
      textInput6.current.focus();
    }
  };

  const handleChangeDigit6 = (currentValue) => {
    clearFocusOnDigit(currentValue, textInput5);
    setDigit6(() => currentValue);
  };

  // When we click on an input we want to clear all the next inputs.
  // If we don't do this, and a user enters an invalid pin and goes to
  // change it, it will constantly be re-checking if the pin is valid
  // which would show them errors over and over
  const clear = (...setters) => {
    setters.map((setter) => setter(''));
  };

  const handleAndroidFocus = () => {
    textInput1.current.focus();
  };

  // There was a UI flicker on Android when transitioning to this screen
  // from the Onboarding Landing page, which is why we are doing
  // the conditional autoFocus'ing and `onDidFocus`

  return (
    <View
      style={[styles.inputs, style]}
      testID="pin-input"
    >
      {Platform.OS === 'android' && <NavigationEvents onDidFocus={handleAndroidFocus} />}
      <Input
        ref={textInput1}
        testID="pin1"
        value={digit1}
        onChangeText={handleChangeDigit1}
        autoFocus={Platform.OS === 'ios'}
        onFocus={() => clear(setDigit1, setDigit2, setDigit3, setDigit4, setDigit5, setDigit6)}
      />
      <Input
        ref={textInput2}
        testID="pin2"
        value={digit2}
        onChangeText={handleChangeDigit2}
        onFocus={() => clear(setDigit2, setDigit3, setDigit4, setDigit5, setDigit6)}
      />
      <Input
        ref={textInput3}
        testID="pin3"
        value={digit3}
        onChangeText={handleChangeDigit3}
        onFocus={() => clear(setDigit3, setDigit4, setDigit5, setDigit6)}
      />
      <Input
        ref={textInput4}
        testID="pin4"
        value={digit4}
        onChangeText={handleChangeDigit4}
        onFocus={() => clear(setDigit4, setDigit5, setDigit6)}
      />
      <Input
        ref={textInput5}
        testID="pin5"
        value={digit5}
        onChangeText={handleChangeDigit5}
        onFocus={() => clear(setDigit5, setDigit6)}
      />
      <Input
        ref={textInput6}
        testID="pin6"
        value={digit6}
        onChangeText={handleChangeDigit6}
        onFocus={() => clear(setDigit6)}
      />
    </View>
  );
};

export default PinInput;
