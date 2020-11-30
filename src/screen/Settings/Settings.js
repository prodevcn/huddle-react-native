import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import HeaderButton from '/navigation/header/HeaderButton';
import screens from '/screen';
import Text from '/component/Text';
import Alert from '/overlay/Alert';
import Switch from '/component/Switch';
import api from '/api';
import * as authActions from '/state/auth/auth.actions';
import * as overlayActions from '/state/overlays/overlays.actions';
import * as biometricAuthSettings from '/state/biometricAuthSettings/biometricAuthSettings.actions';
import * as mixpanelActions from '/state/mixpanel/mixpanel.actions';
import * as tutorialActions from '/state/tutorial/tutorial.actions';
import * as surveyActions from '/state/surveys/surveys.actions';
import * as settingsEvents from '/constants/events/SettingsAndHelp/settings';
import SettingItem from './SettingItem';
import { settingsScreenSelector } from './Settings.selector';
import { EMAIL_REGEXP } from '/util/validations';
import NavigationService from '/navigation/NavigationService';
import ConfirmDialog from '/overlay/ConfirmDialog';
import { format } from '/util';
import offlineMode, { clickHandler } from '/util/offlineMode';

import styles from './Settings.styles';

const FEEDBACK_FORM_HASH = 'QVHSTKT';

const Settings = ({
  navigation,
  checkBiometricSupport,
  disableBiometricAuth,
  trackEvent,
  logout,
  biometricSupport,
  biometryType,
  biometricAuthEnabled,
  currentEmail,
  currentPhoneNumber,
  resetTutorials,
  showOverlay,
  setSurvey,
}) => {
  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const currentEmailAddress = EMAIL_REGEXP.test(currentEmail) ? currentEmail : null;


  const toggleBiometricAuth = (value) => {
    if (value) {
      trackEvent(settingsEvents.CLICK_USE_FACE_ID);
      navigation.push(screens.ChangeYourPinEnterCurrent, {
        fromBiometrics: true,
      });
    } else {
      trackEvent(settingsEvents.CLICK_DO_NOT_USE_FACE_ID);
      disableBiometricAuth();
    }
  };

  const handleLogout = async () => {
    trackEvent(settingsEvents.CLICK_LOGOUT);
    try {
      await logout();
      NavigationService.resetStack();
    } catch (e) {
      Alert.error(api.userMessages.logout.failed);
    }
  };

  const handleLogoutPress = () => {
    showOverlay(ConfirmDialog, {
      title: api.userMessages.logout.confirm.title,
      description: api.userMessages.logout.confirm.description,
      confirmButtonTitle: 'Logout',
      onPress: handleLogout,
    });
  };

  const handleNavigation = (screenName, params = {}, requireNetworkConnection) => () => {
    if (offlineMode.isOffline && requireNetworkConnection) {
      offlineMode.showOfflineAlert();
    } else {
      navigation.push(screenName, params);
    }
  };

  const handleSurveyPress = () => {
    setSurvey(FEEDBACK_FORM_HASH);
  };

  const handleResetTutorials = async () => {
    try {
      await resetTutorials();
      Alert.success(api.userMessages.tutorials.resetSuccess);
    } catch (e) {
      Alert.showGenericError();
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      testID="user-settings"
    >
      <Text.H1>Settings & Preferences</Text.H1>
      <Text.H4 style={styles.sectionTitle}>Account</Text.H4>

      <SettingItem
        title={currentEmail}
        onPress={handleNavigation(screens.SettingsAddEmail, {
          initialEmail: currentEmailAddress, // may be email label
        }, true)}
      />

      <SettingItem
        title={format.phone(currentPhoneNumber, true)}
        onPress={handleNavigation(screens.SettingsAddPhoneNumber, {
          initialMobile: currentPhoneNumber,
        }, true)}
      />

      <Text.H4 style={styles.sectionTitle}>Help & Feedback</Text.H4>
      <SettingItem
        title="Invite others to Huddle"
        onPress={handleNavigation(screens.SettingsInviteSomeone, null, true)}
      />

      <SettingItem
        title="Submit a Help Desk ticket"
        onPress={handleNavigation(screens.SettingHelpDesk, {
          initialEmail: currentEmailAddress,
        }, true)}
      />

      <SettingItem
        title="Give feedback on Huddle"
        onPress={clickHandler(handleSurveyPress)}
      />

      <SettingItem
        title="Reset Tutorials"
        onPress={handleResetTutorials}
      />

      <Text.H4 style={styles.sectionTitle}>Security</Text.H4>

      <SettingItem
        title="Change your PIN code"
        onPress={handleNavigation(screens.ChangeYourPinEnterCurrent, null, true)}
      />

      {biometricSupport && (
        <SettingItem>
          <Switch
            value={biometricAuthEnabled}
            label={`Use ${biometryType}`}
            onChange={toggleBiometricAuth}
          />
        </SettingItem>
      )}

      <SettingItem
        title="Privacy policy"
        onPress={handleNavigation(screens.SettingsPrivacyPolicy)}
      />

      <SettingItem
        title="Terms of use"
        onPress={handleNavigation(screens.SettingsTermsOfUse)}
      />

      <SettingItem
        title="Acknowledgements"
        onPress={handleNavigation(screens.SettingsAcknowledgements)}
      />

      {!!__DEV__ && (
        <SettingItem
          title="UI Kit (Dev only)"
          onPress={handleNavigation(screens.UIKit)}
        />
      )}

      {!!__DEV__ && (
        <SettingItem
          title="Storybook (Dev only)"
          onPress={handleNavigation(screens.Storybook)}
        />
      )}

      <SettingItem
        title="Logout"
        onPress={handleLogoutPress}
        testID="logout-item"
      />
    </ScrollView>
  );
};

Settings.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <HeaderButton
      icon="back"
      onPress={() => navigation.goBack(null)}
    />
  ),
});

export default connect(
  settingsScreenSelector,
  {
    ...biometricAuthSettings,
    ...mixpanelActions,
    logout: authActions.logout,
    resetTutorials: tutorialActions.resetUnread,
    showOverlay: overlayActions.show,
    setSurvey: surveyActions.setSurvey,
  },
)(Settings);
