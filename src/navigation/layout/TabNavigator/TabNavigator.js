import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Platform, View } from 'react-native';
import { store } from '/state/store';

import screens from '/screen';
import globalStyles from '/styles';
import { actions } from '/state/overlays';
import AddItemBottomSheet from '/overlay/AddItemBottomSheet';
import offlineMode from '/util/offlineMode';

import Icon from '/component/Icon';
import Text from '/component/Text';

import styles from './TabNavigator.styles';

const Add = () => (
  <View style={[styles.iconWrapper, styles.add]}>
    <IonIcons
      name="ios-add"
      size={24}
      color="white"
    />
  </View>
);

const TabNavigator = (screenConfig) =>
  createBottomTabNavigator(screenConfig, {
    defaultNavigationOptions: ({ navigation }) => ({
      // To get our styles right I am overriding the tabBarIcon to include
      // our custom Text label as well
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let icon = <Add />;
        let label = 'Add Items';

        if (routeName === screens.Home) {
          iconName = `home${focused ? '-filled' : ''}`;
          label = 'Home';
        } else if (routeName === screens.Items) {
          iconName = `folder${focused ? '-filled' : ''}`;
          label = 'Items';
        }

        if (iconName) {
          icon = (
            <View style={styles.iconWrapper}>
              <Icon
                name={iconName}
                size={24}
                color={tintColor}
                style={styles.icon}
              />
            </View>
          );
        }

        // You can return any component that you like here!
        return (
          <View style={styles.button}>
            {icon}
            <Text
              fontSize={13}
              lineHeight={16}
              color={focused ? 'dark' : 'medium'}
            >
              {label}
            </Text>
          </View>
        );
      },
      tabBarOnPress: ({ navigation: tabNavigation, defaultHandler }) => {
        if (tabNavigation.state.routeName === screens.AddItemButton) {
          if (offlineMode.isOffline) {
            offlineMode.showOfflineAlert();
          } else {
            store.dispatch(actions.show(AddItemBottomSheet, { navigation: tabNavigation }));
          }
        } else {
          defaultHandler();
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: globalStyles.palette.deepBlue,
      inactiveTintColor: globalStyles.palette.grey01,
      showLabel: false,
      style: {
        height: 72,
        backgroundColor: globalStyles.palette.white,
        ...Platform.select({
          ios: {
            shadowColor: globalStyles.palette.deepBlue,
            shadowRadius: 32,
            shadowOpacity: 0.1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderTopWidth: 0,
          },
        }),
      },
    },
  });

export default TabNavigator;
