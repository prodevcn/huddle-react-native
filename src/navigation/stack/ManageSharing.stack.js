import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';
import ManageSharing from '/screen/Share/ManageSharing';
import SharedLinkActivity from '/screen/Share/SharedLinkActivity';

import allScreens from '/screen';

export const screens = {
  [allScreens.ManageSharing]: ManageSharing,
  [allScreens.SharedLinkActivity]: SharedLinkActivity,
};

export default createStackNavigator(screens, {
  initialRouteName: allScreens.ManageSharing,
  defaultNavigationOptions: BasicHeader,
});
