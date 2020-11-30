import { createStackNavigator } from 'react-navigation-stack';
import BasicHeader from '/navigation/header/BasicHeader';
import ShareLink from '/screen/Share/ShareLink';

export default createStackNavigator({
  ShareLink,
}, {
  initialRouteName: 'ShareLink',
  defaultNavigationOptions: BasicHeader,
});
