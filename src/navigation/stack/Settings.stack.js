import { createStackNavigator } from 'react-navigation-stack';

import AddPhoneNumber from '/screen/Settings/AddPhoneNumber';
import BasicHeader from '/navigation/header/BasicHeader';
import EnterCurrentPin from '/screen/Settings/ChangeYourPin/EnterCurrentPin';
import CreateNewPin from '/screen/Settings/ChangeYourPin/CreateNewPin/CreateNewPin';
import ConfirmNewPin from '/screen/Settings/ChangeYourPin/ConfirmNewPin';
import AddEmail from '/screen/Settings/AddEmail';
import HelpDesk from '/screen/Settings/HelpDesk';
import InviteSomeone from '/screen/Settings/InviteSomeone';
import Settings from '/screen/Settings/Settings';
import { Acknowledgements, TermsOfUse, PrivacyPolicy } from '/screen/TermsOfUse';
import SettingsVerify from '/screen/Settings/SettingsVerify';
import screens from '/screen';

export default createStackNavigator(
  {
    [screens.ChangeYourPinEnterCurrent]: EnterCurrentPin,
    [screens.ChangeYourPinCreateNew]: CreateNewPin,
    [screens.ChangeYourPinConfirmNew]: ConfirmNewPin,
    [screens.SettingHelpDesk]: HelpDesk,
    [screens.SettingsAddPhoneNumber]: AddPhoneNumber,
    [screens.SettingsAddEmail]: AddEmail,
    [screens.SettingsAcknowledgements]: Acknowledgements,
    [screens.SettingsInviteSomeone]: InviteSomeone,
    [screens.SettingsPrivacyPolicy]: PrivacyPolicy,
    [screens.SettingsTermsOfUse]: TermsOfUse,
    [screens.SettingsVerify]: SettingsVerify,
    [screens.Settings]: Settings,
  },
  {
    initialRouteName: screens.Settings,
    defaultNavigationOptions: BasicHeader,
  },
);
