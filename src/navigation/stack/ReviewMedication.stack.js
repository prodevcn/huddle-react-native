import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';

import SelectMedication from '/screen/ReviewMedication/SelectMedication';
import ConfirmMedication from '/screen/ReviewMedication/ConfirmMedication';
import { screens as itemScreens } from '/navigation/stack/AddItem.stack';

import screens from '/screen';

export default createStackNavigator({
  [screens.SelectMedication]: SelectMedication,
  [screens.ConfirmMedication]: ConfirmMedication,
  ...itemScreens,
}, {
  initialRouteName: screens.SelectMedication,
  defaultNavigationOptions: BasicHeader,
});
