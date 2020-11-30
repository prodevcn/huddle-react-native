import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export const setBarStyle = (style) => StatusBar.setBarStyle(style);

export const UseLightStatusBar = () => (
  <NavigationEvents
    onWillFocus={() => setBarStyle('light-content')}
    onWillBlur={() => setBarStyle('dark-content')}
  />
);
