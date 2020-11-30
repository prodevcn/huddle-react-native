import { createStackNavigator } from 'react-navigation-stack';

import BasicHeader from '/navigation/header/BasicHeader';
import screens from '/screen';

import Onboarding from '/screen/Onboarding/Onboarding';
import OnboardingEnterPhone from '/screen/Onboarding/EnterPhone';
import OnboardingVerify from '/screen/Onboarding/Verify';
import OnboardingEnterEmail from '/screen/Onboarding/EnterEmail';
import OnboardingEnterPin from '/screen/Onboarding/EnterPin';
import OnboardingConfirmPin from '/screen/Onboarding/ConfirmPin';
import OnboardingBiometrics from '/screen/Onboarding/Biometrics';
import OnboardingPinLogin from '/screen/Onboarding/PinLogin';
import OnboardingEnterInfo from '/screen/Onboarding/EnterInfo';
import OnboardingCaregiver from '/screen/Onboarding/Caregiver';
import OnboardingChooseProfile from '/screen/Onboarding/ChooseProfile';
import OnboardingPickSuggestionType from '/screen/Onboarding/PickSuggestionType';
import CreateNewProfileStack from '/navigation/stack/CreateNewProfile.stack';

import { TermsOfUse, PrivacyPolicy } from '/screen/TermsOfUse';

export default createStackNavigator(
  {
    [screens.Onboarding]: Onboarding,
    [screens.OnboardingEnterPhone]: OnboardingEnterPhone,
    [screens.OnboardingVerify]: OnboardingVerify,
    [screens.OnboardingEnterEmail]: OnboardingEnterEmail,
    [screens.OnboardingEnterPin]: OnboardingEnterPin,
    [screens.OnboardingConfirmPin]: OnboardingConfirmPin,
    [screens.OnboardingBiometrics]: OnboardingBiometrics,
    [screens.OnboardingPinLogin]: OnboardingPinLogin,
    [screens.OnboardingEnterInfo]: OnboardingEnterInfo,
    [screens.OnboardingCaregiver]: OnboardingCaregiver,
    [screens.OnboardingChooseProfile]: OnboardingChooseProfile,
    [screens.SettingsTermsOfUse]: TermsOfUse,
    [screens.SettingsPrivacyPolicy]: PrivacyPolicy,
    [screens.OnboardingPickSuggestionType]: OnboardingPickSuggestionType,
    [screens.CreateNewProfileStack]: {
      screen: CreateNewProfileStack,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: screens.Onboarding,
    // Set the headerMode to screen to prevent the PinLogin header from being a janky
    // grey shadow when we `replace()` from the Onboarding screen
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigationOptions }) => BasicHeader({
      ...navigationOptions,
      gesturesEnabled: false,
    }),
  },
);
