import * as React from 'react';
import { View, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import screens from '/screen';
import BasicHeader from '/navigation/header/BasicHeader';
import buildHeaderRight from '/navigation/helpers/buildHeaderRight';

// ========================
// Sub Pages
// ========================
import UIKit from './UIKit';
import UIKitButtons from './pages/UIKitButtons';
import UIKitIcons from './pages/UIKitIcons';
import UIKitTypography from './pages/UIKitTypography';
import UIKitBadges from './pages/UIKitBadges';
import UIKitFormComponents from './pages/UIKitFormComponents';
import UIKitRedux from './pages/UIKitRedux';
import UIKitListItems from './pages/UIKitListItems';
import UIKitModalWindows from './pages/UIKitModalWindows';
import UIKitAlerts from './pages/UIKitAlerts';
import UIKitAvatars from './pages/UIKitAvatars';

import globalStyles from '/styles';

export default createStackNavigator(
  {
    [screens.UIKit]: UIKit,
    UIKitButtons,
    UIKitTypography,
    UIKitBadges,
    UIKitFormComponents,
    UIKitRedux,
    UIKitListItems,
    UIKitAlerts,
    UIKitAvatars,
    UIKitIcons,
    UIKitModalWindows,
    UIKitWithButtonLabel: {
      screen: () => <View />,
      navigationOptions: {
        headerRight: buildHeaderRight([
          {
            icon: 'settings',
            onPress: () => Alert.alert('edit press'),
            label: 'Edit',
          },
        ]),
      },
    },
    UIKitWithButtonLabelAndBackground: {
      screen: () => <View />,
      navigationOptions: ({ navigationOptions }) => ({
        headerStyle: {
          ...navigationOptions.headerStyle,
          backgroundColor: globalStyles.palette.coral,
        },
        headerRight: buildHeaderRight([
          {
            icon: 'settings',
            onPress: () => Alert.alert('edit press'),
            label: 'Edit',
          },
        ]),
      }),
    },
  },
  {
    initialRouteName: screens.UIKit,
    defaultNavigationOptions: BasicHeader,
  },
);
