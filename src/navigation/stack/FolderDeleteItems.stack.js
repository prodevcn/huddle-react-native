import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';
import FolderDeleteItems from '/screen/Folders/FolderDeleteItems';

import screens from '/screen';

export default createStackNavigator({
  [screens.FolderDeleteItems]: FolderDeleteItems,
}, {
  initialRouteName: screens.FolderDeleteItems,
  defaultNavigationOptions: BasicHeader,
});
