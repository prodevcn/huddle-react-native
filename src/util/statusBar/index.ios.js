import React from 'react';

import { NativeModules } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const { HuddleStatusBar } = NativeModules;

export const setBarStyle = (style) => HuddleStatusBar.setBarStyle(style);

export const UseLightStatusBar = () => (
  <NavigationEvents
    onWillFocus={() => setBarStyle('light-content')}
    onWillBlur={() => setBarStyle('dark-content')}
  />
);
