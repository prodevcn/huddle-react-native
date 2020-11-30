import { createStackNavigator } from 'react-navigation-stack';

import screens from '/screen';
import BasicHeader from '/navigation/header/BasicHeader';
import OnboardingCaregiver from '/screen/Onboarding/Caregiver';
import OnboardingEnterInfo from '/screen/Onboarding/EnterInfo';

export default createStackNavigator(
  {
    [screens.CreateNewProfile]: OnboardingCaregiver,
    [screens.NewProfilePersonalDetails]: OnboardingEnterInfo,
  },
  {
    initialRouteName: screens.CreateNewProfile,
    defaultNavigationOptions: BasicHeader,
  },
);
