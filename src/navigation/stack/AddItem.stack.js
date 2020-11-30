import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';

import AddItem from '/screen/Item/AddItem';
import AddItemPickMedication from '/screen/Item/PickMedication';
import AddItemPickType from '/screen/Item/PickType';
import EditItem from '/screen/Item/EditItem';
import AddInsuranceCard from '/screen/Health/AddInsuranceCard/AddInsuranceCard';
import ScanInsuranceCard from '/screen/Health/ScanInsuranceCard';

import allScreens from '/screen';
import globalStyles from '/styles';

const getHeaderStyle = ({ navigationOptions }) => ({
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: globalStyles.palette.grey04,
  },
});

// Define these screens here so that we can use them in the Item.stack.js
// This makes it so we don't need to re-define the screens in both places
export const screens = {
  [allScreens.EditItem]: {
    screen: EditItem,
    navigationOptions: getHeaderStyle,
  },
  [allScreens.AddItem]: AddItem,
  [allScreens.AddItemPickMedication]: AddItemPickMedication,
  [allScreens.AddItemPickType]: AddItemPickType,
  [allScreens.AddInsuranceCard]: AddInsuranceCard,
  [allScreens.ScanInsuranceCard]: ScanInsuranceCard,
};

export default createStackNavigator(screens,
  {
    initialRouteName: allScreens.AddItem,
    defaultNavigationOptions: BasicHeader,
    headerMode: 'screen',
  });
