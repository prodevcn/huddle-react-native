import { createStackNavigator } from 'react-navigation-stack';

import AddInsuranceCard from '/screen/Health/AddInsuranceCard';
import BasicHeader from '/navigation/header/BasicHeader';
import HealthSummary from '/screen/Health/HealthSummary';
import ScanInsuranceCard from '/screen/Health/ScanInsuranceCard';
import HealthCategory from '/screen/Health/HealthCategory';

import { screens as itemScreens } from '/navigation/stack/AddItem.stack';
import allScreens from '/screen';

export const screens = {
  [allScreens.Health]: HealthSummary,
  [allScreens.AddInsuranceCard]: AddInsuranceCard,
  [allScreens.ScanInsuranceCard]: ScanInsuranceCard,
  [allScreens.HealthCategory]: HealthCategory,
  ...itemScreens,
};

export default createStackNavigator(
  screens,
  {
    initialRouteName: screens.Health,
    defaultNavigationOptions: BasicHeader,
    headerMode: 'screen',
  },
);
