import { createStackNavigator } from 'react-navigation-stack';

import screens from '/screen';
import BasicHeader from '/navigation/header/BasicHeader';
import ManageProfile from '/screen/ManageProfile';
import CareTeamContacts from '/screen/CareTeamContacts';
import CareTeamConfirm from '/screen/CareTeamConfirm';

export default createStackNavigator(
  {
    [screens.ManageProfile]: ManageProfile,
    [screens.CareTeamContacts]: CareTeamContacts,
    [screens.CareTeamConfirm]: CareTeamConfirm,
  },
  {
    initialRouteName: screens.ManageProfile,
    defaultNavigationOptions: BasicHeader,
  },
);
