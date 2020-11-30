import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';

import CreateNewProfileStack from '/navigation/stack/CreateNewProfile.stack';
import ManageProfileStack from '/navigation/stack/ManageProfile.stack';
import Profiles from '/screen/Profiles/Profiles';
import Settings from '/navigation/stack/Settings.stack';

import screens from '/screen';

export default createStackNavigator(
  {
    [screens.Profiles]: Profiles,
    [screens.ManageProfileStack]: ManageProfileStack,
    [screens.CreateNewProfileStack]: CreateNewProfileStack,
    [screens.SettingsStack]: Settings,
  },
  {
    initialRouteName: screens.Profiles,
    defaultNavigationOptions: BasicHeader,
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
