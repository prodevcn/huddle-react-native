import React, { useEffect } from 'react';
import { Platform, StatusBar, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Transition } from 'react-native-reanimated';

import NavigationService from './NavigationService';

import TabNavigator from '/navigation/layout/TabNavigator';

import screens from '/screen';
import { store, persistor } from '/state/store';
import { setScreenName, trackEvent } from '/state/mixpanel/mixpanel.actions';

import Home from '/navigation/stack/Home.stack';
import Health from '/navigation/stack/Health.stack';
import Item from '/navigation/stack/Item.stack';
import Items from '/navigation/stack/Items.stack';
import AddItem from '/navigation/stack/AddItem.stack';
import Onboarding from '/navigation/stack/Onboarding.stack';
import Profiles from '/navigation/stack/Profiles.stack';
import ReviewMedication from '/navigation/stack/ReviewMedication.stack';
import ScanInsuranceCard from '/navigation/stack/ScanInsuranceCard.stack';
import Camera from '/navigation/stack/Camera.stack';
import FolderFormStack from '/navigation/stack/FolderForm.stack';
import FolderAddItemsStack from '/navigation/stack/FolderAddItems.stack';
import ShareLinkStack from '/navigation/stack/ShareLink.stack';
import FolderDeleteItemsStack from '/navigation/stack/FolderDeleteItems.stack';
import ManageSharingStack from '/navigation/stack/ManageSharing.stack';

import UIKit from '../../UIKit/UIKit.stack';
import Storybook from '../../storybook/storybook.stack';

import Mask from '/component/Mask';
import Alert from '/overlay/Alert';
import OverlayContainer from '/overlay/OverlayContainer';
import OfflineWrapper from '/navigation/layout/OfflineWrapper';
import Survey from '/screen/Survey';

import { setBarStyle } from '/util/statusBar';
import offlineMode from '/util/offlineMode';
import errorLogger from '/util/errorLogger';

errorLogger.init();

// todo toadums not the best solution but lets silence this
// componentWillMount deprecation warning. Since we are using
// functional components anyways we shouldn't have an issue
YellowBox.ignoreWarnings(['componentWillMount']);

const tabNavigator = TabNavigator({
  [screens.Home]: Home,
  [screens.AddItemButton]: AddItem,
  [screens.Items]: Items,
});

const onboardingSwitchNavigator = createAnimatedSwitchNavigator(
  {
    [screens.HomeStack]: tabNavigator,
    [screens.OnboardingStack]: Onboarding,
  },
  {
    initialRouteName: screens.OnboardingStack,
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={200}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={300} />
      </Transition.Together>
    ),
  },
);

const modalNavigator = createStackNavigator(
  {
    [screens.InitialStack]: onboardingSwitchNavigator,
    [screens.AddItemStack]: AddItem,
    [screens.HealthStack]: Health,
    [screens.ScanInsuranceCardStack]: ScanInsuranceCard,
    [screens.ItemStack]: Item,
    [screens.ProfilesStack]: Profiles,
    [screens.ReviewMedicationStack]: ReviewMedication,
    [screens.UIKit]: UIKit,
    [screens.Storybook]: Storybook,
    [screens.CameraStack]: Camera,
    [screens.FolderFormStack]: FolderFormStack,
    [screens.FolderAddItemsStack]: FolderAddItemsStack,
    [screens.FolderDeleteItemsStack]: FolderDeleteItemsStack,
    [screens.ShareLinkStack]: ShareLinkStack,
    [screens.ManageSharingStack]: ManageSharingStack,
  },
  {
    initialRouteName: screens.InitialStack,
    mode: 'modal',
    headerMode: 'none',
  },
);

const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};

const Navigation = createAppContainer(modalNavigator);

// TODO danactive when online Dan likes to jump to a specific screen :) Please leave for app load
// NavigationService.navigateOrQueue(screens.SharedLinkActivity, {
//   shareId: '81123826-a677-4235-b3d4-436357312650',
// });

const AppRoot = () => {
  // Ensure that the app **always** launches with a dark header.
  // We need to do this imperatively to make sure it happens
  useEffect(() => {
    setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    offlineMode.initialize();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OfflineWrapper>
          <Navigation
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);

              if (prevScreen !== currentScreen) {
                store.dispatch(setScreenName(currentScreen));
                // todo (r3nya): Get second last route
                // store.dispatch(trackEvent(`${prevScreen}: Back`));
                store.dispatch(trackEvent(`${currentScreen}: View`));
              }
            }}
          />
        </OfflineWrapper>
      </PersistGate>
      {/* We want to render these components over our navigation stack. Controlled by Redux */}
      <OverlayContainer />
      <Alert />
      <Mask />
      <Survey />
    </Provider>
  );
};

export default AppRoot;
