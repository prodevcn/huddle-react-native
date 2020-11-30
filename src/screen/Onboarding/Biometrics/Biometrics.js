import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import screens from '/screen';
import Text from '/component/Text';
import Button from '/component/Button';
import { biometricAuthSettingsSelector } from '/state/biometricAuthSettings/biometricAuthSettings.selectors';
import { actions as biometricAuthActions } from '/state/biometricAuthSettings';
import { actions as mixpanelActions } from '/state/mixpanel';
import { selectors as profileSelectors } from '/state/profiles';
import * as events from '/constants/events/Onboarding/enableFingerprint';
import onboardingStyles from '/screen/Onboarding/Onboarding.styles';
import styles from './Biometrics.styles';
import touchId from '/util/touchId';
import onboardingHelper from '/util/onboardingHelper';

const Biometrics = ({
  flow,
  navigation,
  biometryType,
  enableBiometricAuth,
  disableBiometricAuth,
  trackEvent,
  currentProfile,
}) => {
  const nextRoute = () => {
    if (flow === 'login' && currentProfile) {
      onboardingHelper.dismiss(navigation);
    } else {
      navigation.push(screens.OnboardingChooseProfile);
    }
  };

  const handleEnablePress = async () => {
    trackEvent(events.CLICK_ENABLE);
    try {
      await touchId.authenticate(`Enable ${biometryType}`);
      enableBiometricAuth();
    } finally {
      nextRoute();
    }
  };

  const handleSkip = () => {
    trackEvent(events.CLICK_SKIP_FINGERPRINT);
    disableBiometricAuth();
    nextRoute();
  };

  return (
    <View style={[onboardingStyles.content, styles.wrapper]}>
      <Text.H2>{`Enable ${biometryType}?`}</Text.H2>
      <Text color="medium" style={styles.subtitle}>
        This will help you login faster next time.
      </Text>

      <View style={styles.buttonWrapper}>
        <Button text="Enable" onPress={handleEnablePress} />

        <TouchableOpacity style={styles.skip} onPress={handleSkip}>
          <Text.BodySmall>
            {`Skip enabling ${biometryType}`}
          </Text.BodySmall>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Biometrics.navigationOptions = {
  headerLeft: null,
};

export default connect(
  (state) => ({
    ...biometricAuthSettingsSelector(state),
    flow: state.onboarding.flow,
    currentProfile: profileSelectors.currentProfileCodeSelector(state),
  }),
  {
    checkBiometricSupport: biometricAuthActions.checkBiometricSupport,
    enableBiometricAuth: biometricAuthActions.enableBiometricAuth,
    disableBiometricAuth: biometricAuthActions.disableBiometricAuth,
    trackEvent: mixpanelActions.trackEvent,
  },
)(Biometrics);
