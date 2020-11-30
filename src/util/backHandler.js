/**
 * This component will allow us to override the back button in Android.
 *
 * You can optionally pass in an `onBack` callback, but by default it will
 * override the back button and just not do anything when it is pressed.
 * If you'd like to simply disable the back button, just render this
 * component with no props: `<BackButton />`
 *
 * If you would like to have the back button disabled for the entire time that
 * the component is mounted, and not have the handler be removed when the screen
 * blurs, use the `ignoreNavigationEvents` prop. Eg:
 *
 * `<BackHandler ignoreNavigationEvents />`
 */
import React, { useEffect, useRef } from 'react';
import { BackHandler as RNBackHandler } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const BackHandler = ({ onBack, ignoreNavigationEvents }) => {
  const backRef = useRef(null);

  const removeHandler = () => {
    if (backRef.current) {
      backRef.current.remove();
      backRef.current = null;
    }
  };

  const setHandler = () => {
    backRef.current = RNBackHandler.addEventListener('hardwareBackPress', () => {
      if (onBack) {
        onBack();
      }
      return true;
    });
  };

  // When the component mounts and unmounts we will set the handlers
  useEffect(() => {
    setHandler();
    return () => removeHandler();
  }, []);

  // We may want to register a back handler without wanting it to be removed
  // when the view blurs
  if (ignoreNavigationEvents) {
    return null;
  }

  return (
    <NavigationEvents
      onWillFocus={setHandler}
      onWillBlur={removeHandler}
    />
  );
};

export default BackHandler;
