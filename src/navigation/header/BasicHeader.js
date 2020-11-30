/**
 * This header is probably going to be used for most headers. It sets some defaults,
 * which are named the same as the react-navigation#navigationOptions. **ANY** of these
 * can be overridden just by passing them into your navigationOptions in your route.
 */
import React from 'react';
import { StatusBar, Platform } from 'react-native';

import HeaderButton, { BUTTON_HEIGHT } from './HeaderButton';

import globalStyles from '/styles';

/**
 *
 * Create a custom styled header with defaults that match our designs.
 * The `navigationOptions` that are passed in will be merged with the
 * defaults - so you can override any style
 *
 * You do not need to provide any `navigationOption`s - you can simply go:
 * `navigationOptions: BasicHeader` in your components.
 *
 * @param {object} navigationOptions
 * For information see https://reactnavigation.org/docs/en/headers.html
 */
const BasicHeader = (navigationOptions = {}) => ({
  ...navigationOptions,
  headerTintColor: globalStyles.palette.deepBlue,
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    ...navigationOptions.headerStyle,
    // on Android we are setting the StatusBar to be translucent. This makes
    // it behave the same as the iOS StatusBar (think `position: fixed` in
    // web terms). This means that we need to pad the top of the header on
    // Android only. On iOS it is already handled for us by react-navigation
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight + globalStyles.padding.xxs,
        height: BUTTON_HEIGHT + StatusBar.currentHeight + globalStyles.padding.xxs,
      },
    }),
  },
  headerLeft: ({ onPress }) => (
    <HeaderButton
      icon="back"
      onPress={onPress}
    />
  ),
  headerLeftContainerStyle: {
    ...navigationOptions.headerLeftContainerStyle,
    paddingLeft: globalStyles.padding.md,
  },
  headerRightContainerStyle: {
    paddingRight: globalStyles.padding.md,
    ...navigationOptions.headerRightContainerStyle,
  },

  // Never show the title on the back button
  headerBackTitle: null,

  // No headers in the design have right buttons as well as a title, so hide
  // the title if we have right buttons
  headerTitleContainerStyle: { display: navigationOptions.headerRight ? 'none' : 'flex' },
});

export default BasicHeader;
