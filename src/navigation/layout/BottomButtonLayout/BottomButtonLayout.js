import React, { useEffect, useState } from 'react';
import {
  Keyboard, Platform, View, ScrollView,
} from 'react-native';

import TopShadowAndroid from '/component/TopShadowAndroid';

import styles from './BottomButtonLayout.styles';

const BottomButtonLayout = ({
  ScrollComponent,
  children,
  control,
  style,
  contentContainerStyle,
  ...scrollProps
}) => {
  const Scroller = ScrollComponent || ScrollView;
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleKeyboardShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  // When the keyboard is visible the control appears above it on Android, taking up screen space.
  // This effect will keep track of whether or not the keyboard is visible
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', handleKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', handleKeyboardHide);
    };
  }, []);

  // We don't want to show the control on Android if the keyboard is up
  const showControl = Platform.OS === 'ios' || !keyboardVisible;

  return (
    <View style={[styles.wrapper, style]}>
      <Scroller
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        {...scrollProps}
      >
        {children}
      </Scroller>
      {showControl && !!control && (
        <View style={styles.buttonWrapper}>
          {Platform.OS === 'android' && <TopShadowAndroid style={styles.androidShadow} />}
          {control}
        </View>
      )}
    </View>
  );
};

export default BottomButtonLayout;
