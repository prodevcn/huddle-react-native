import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';
import FolderForm from '/screen/Folders/FolderForm';
import Folder from '/screen/Folders/Folder';
import FolderAddItems from '/screen/Folders/FolderAddItems';

import screens from '/screen';

export default createStackNavigator({
  [screens.FolderForm]: FolderForm,
  [screens.Folder]: Folder,
  [screens.FolderAddItems]: FolderAddItems,
}, {
  initialRouteName: screens.FolderForm,
  defaultNavigationOptions: BasicHeader,
});
