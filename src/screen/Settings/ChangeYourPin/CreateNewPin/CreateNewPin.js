import React from 'react';
import { useDispatch } from 'react-redux';

import screens from '/screen';
import PinForm from '/partial/PinForm';
import Text from '/component/Text';
import * as events from '/constants/events/SettingsAndHelp/changePinCreatePin';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';

const CreateNewPin = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    dispatch(trackEvent(events.ENTERED));

    navigation.push(screens.ChangeYourPinConfirmNew, {
      newPin: value,
    });
  };

  return (
    <PinForm
      title={(
        <Text.Plain>
          Create a new
          {'\n'}
          6 digit pin
        </Text.Plain>
      )}
      subtitle="Make sure you remember your pin, you&apos;ll need this to login to your account"
      onSubmit={handleSubmit}
    />
  );
};

export default CreateNewPin;
