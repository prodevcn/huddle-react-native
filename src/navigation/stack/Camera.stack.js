import { createStackNavigator } from 'react-navigation-stack';

import BasicHeader from '/navigation/header/BasicHeader';
import Camera from '/screen/Camera';

import screens from '/screen';

export default createStackNavigator(
  {
    [screens.Camera]: Camera,
  },
  {
    initialRouteName: screens.Camera,
    defaultNavigationOptions: BasicHeader,
    headerMode: 'none',
  },
);
