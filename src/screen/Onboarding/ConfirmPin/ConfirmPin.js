import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Text from '/component/Text';
import PinForm from '/partial/PinForm';
import Alert from '/overlay/Alert';

import { selectors, actions as onboardingActions } from '/state/onboarding';
import { actions as mixpanelActions } from '/state/mixpanel';

import api from '/api';
import * as events from '/constants/events/Onboarding/confirmPin';
import screens from '/screen';
import { format, secureStorage } from '/util';
import onboardingHelper from '/util/onboardingHelper';


const ConfirmPin = ({
  setPinCode,
  flow,
  navigation,
  resetPin,
  trackEvent,
  hasSuggestion,
  data,
}) => {
  const newPin = navigation.getParam('newPin');
  const handleSubmit = async (value) => {
    trackEvent(events.ENTERED);

    if (newPin === value) {
      trackEvent(events.MATCHED);
      setPinCode(value);

      if (flow === 'signup') {
        // If the user is coming from Link we may have prepopulated data for them, so don't
        // need to take them to the EnterInfo screen
        if (hasSuggestion) {
          navigation.push(screens.OnboardingPickSuggestionType);
        } else {
          const routeParams = {};
          const careBundle = { validationCode: secureStorage.validationCode };
          if (data.email) {
            careBundle.email = data.email;
          } else {
            careBundle.mobile = data.mobile;
          }

          try {
            const response = await api.user.getCareInviter(careBundle);
            if (get(response, 'careTeamInviterList.length')) {
              routeParams.isCareTeamInvite = true;
            }
          } finally {
            navigation.push(screens.OnboardingEnterInfo, routeParams);
          }
        }
      } else {
        // The only time in the login flow that the user will confirm their pin
        // is if they are resetting their pin

        // Store the new pin in secure storage. I'm not sure why it would fail
        // Doing it in a separate try/catch to isolate the error
        try {
          await secureStorage.setPin(format.encryptPinCode(value));
        } catch (e) {
          Alert.showGenericError();
          return;
        }

        try {
          await resetPin();
          onboardingHelper.dismiss(navigation);
        } catch (e) {
          if (e.status === api.errorCodes.RESET_PIN_TOO_MANY_ATTEMPTS) {
            Alert.error(api.userMessages.pin.tooManyTries);
          } else {
            Alert.error(api.userMessages.pin.invalidCredentials);
          }
        }
      }
    } else {
      trackEvent(events.FAILED_TO_MATCH);
      Alert.error(api.userMessages.pin.mismatch);
    }
  };

  return (
    <PinForm
      title={(
        <Text.Plain>
          Confirm your
          {'\n'}
          6 digit pin
        </Text.Plain>
      )}
      subtitle="Make sure you remember your pin, you'll need this to login to your account"
      onSubmit={handleSubmit}
      blurOnSubmit
      testID="confirm-pin-form"
    />
  );
};

export default connect(
  (state) => ({
    flow: state.onboarding.flow,
    hasSuggestion: selectors.hasSuggestion(state),
    data: state.onboarding.data,
  }),
  {
    setPinCode: onboardingActions.setPinCode,
    resetPin: onboardingActions.resetPin,
    trackEvent: mixpanelActions.trackEvent,
  },
)(ConfirmPin);
