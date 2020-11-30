import { createStackNavigator } from 'react-navigation-stack';

import BasicHeader from '/navigation/header/BasicHeader';
import Item from '/screen/Item/Item';
import ShareLink from '/screen/Share/ShareLink';
import { screens as itemScreens } from '/navigation/stack/AddItem.stack';
import { screens as sharingScreens } from '/navigation/stack/ManageSharing.stack';

import screens from '/screen';

export default createStackNavigator(
  {
    [screens.Item]: Item,
    [screens.ShareLink]: ShareLink,
    ...sharingScreens,
    ...itemScreens,
  },
  {
    initialRouteName: screens.Item,
    defaultNavigationOptions: BasicHeader,
  },
);
