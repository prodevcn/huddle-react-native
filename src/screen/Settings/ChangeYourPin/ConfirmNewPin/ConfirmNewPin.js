import React from 'react';
import { useDispatch } from 'react-redux';

import Alert from '/overlay/Alert';
import Text from '/component/Text';
import PinForm from '/partial/PinForm';
import api from '/api';
import { format, secureStorage } from '/util';
import * as events from '/constants/events/SettingsAndHelp/changePinConfirmPin';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';

const ConfirmNewPin = ({ navigation }) => {
  const dispatch = useDispatch();
  const newPin = navigation.getParam('newPin');

  const handleSubmit = async (value) => {
    dispatch(trackEvent(events.ENTERED));

    // If the two pins match, update on the API, store in secure storage, and dismiss the modal
    if (newPin === value) {
      dispatch(trackEvent(events.MATCHED));

      try {
        const pin = format.encryptPinCode(newPin);
        await api.user.update({ pinCode: pin });
        await secureStorage.setPin(pin);
        navigation.popToTop();
      } catch (e) {
        // I'm not sure what could go wrong in this, so show a generic error
        Alert.showGenericError();
      }
    } else {
      dispatch(trackEvent(events.FAILED_TO_MATCH));
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
      subtitle="Make sure you remember your pin, you&apos;ll need this to login to your account"
      onSubmit={handleSubmit}
      blurOnSubmit
    />
  );
};

export default ConfirmNewPin;
