import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';
import FolderAddItems from '/screen/Folders/FolderAddItems';
import FolderSelectItems from '/screen/Folders/FolderSelectItems';

import screens from '/screen';

export default createStackNavigator({
  [screens.FolderAddItems]: FolderAddItems,
  [screens.FolderSelectItems]: FolderSelectItems,
}, {
  initialRouteName: screens.FolderAddItems,
  defaultNavigationOptions: BasicHeader,
});
