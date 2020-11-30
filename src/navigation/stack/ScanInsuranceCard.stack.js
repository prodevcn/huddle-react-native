import { createStackNavigator } from 'react-navigation-stack';

import BasicHeader from '/navigation/header/BasicHeader';
import { screens } from '/navigation/stack/Health.stack';

import allScreens from '/screen';

export default createStackNavigator(
  screens,
  {
    initialRouteName: allScreens.AddInsuranceCard,
    defaultNavigationOptions: BasicHeader,
    headerMode: 'screen',
  },
);
