import React from 'react';
import sha256 from 'crypto-js/sha256';
import { connect } from 'react-redux';

import screens from '/screen';
import Alert from '/overlay/Alert';
import Text from '/component/Text';
import PinForm from '/partial/PinForm';
import { secureStorage } from '/util';
import api from '/api';

import * as biometricAuthSettings from '/state/biometricAuthSettings/biometricAuthSettings.actions';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as events from '/constants/events/SettingsAndHelp/changePinCurrentPin';
import * as enableBiometricEvents from '/constants/events/SettingsAndHelp/enableBiometricIdPinRequest';

const EnterCurrentPin = ({
  navigation,
  enableBiometricAuth,
  trackEvent,
}) => {
  const fromBiometrics = navigation.getParam('fromBiometrics');

  const handleSubmit = (value) => {
    trackEvent(events.ENTERED);

    // Compare the current password to the one in secureStorage
    if (sha256(value).toString() === secureStorage.pinCode) {
      if (fromBiometrics) {
        trackEvent(enableBiometricEvents.CORRECT);
        enableBiometricAuth();
        navigation.popToTop();
      } else {
        navigation.push(screens.ChangeYourPinCreateNew);
      }
    } else {
      if (fromBiometrics) {
        trackEvent(enableBiometricEvents.FAIL);
      }

      Alert.error(api.userMessages.pin.invalidCurrentPin);
    }
  };

  return (
    <PinForm
      title={(
        <Text.Plain>
          Enter your current
          {'\n'}
          6 digit pin
        </Text.Plain>
      )}
      onSubmit={handleSubmit}
    />
  );
};

export default connect(null, {
  ...biometricAuthSettings,
  trackEvent: mixpanelActions.trackEvent,
})(EnterCurrentPin);
