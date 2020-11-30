import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';
import Items from '/screen/Items';
import Folders from '/screen/Folders/Folders';
import Folder from '/screen/Folders/Folder';

import screens from '/screen';

export default createStackNavigator({
  ItemsMain: Items,
  [screens.Folders]: Folders,
  [screens.Folder]: Folder,
}, {
  initialRouteName: 'ItemsMain',
  defaultNavigationOptions: BasicHeader,
});
