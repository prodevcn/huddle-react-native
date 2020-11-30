import React from 'react';
import { useDispatch } from 'react-redux';

import UniquenessError from '/api/errors/UniquenessError';
import screens from '/screen';
import Alert from '/overlay/Alert';
import SingleValueForm from '/partial/SingleValueForm';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import api from '/api';
import * as changeMobileNumberEvents from '/constants/events/SettingsAndHelp/changeMobileNumber';
import { format, validations } from '/util';
import { PHONE_NUMBER_REGEXP } from '/util/validations';

const AddPhoneNumber = ({ navigation }) => {
  const dispatch = useDispatch();
  const initialPhone = navigation.getParam('initialMobile');
  const displayPhone = PHONE_NUMBER_REGEXP.test(initialPhone) ? initialPhone : '';

  const handleFormSubmit = async ({ value }, formActions) => {
    dispatch(trackEvent(changeMobileNumberEvents.CLICK_CONTINUE));

    const formatted = format.phone(value);

    try {
      // Check to see if that phone number is already taken
      await api.user.lookup({ mobile: formatted });

      navigation.push(screens.SettingsVerify, {
        type: 'mobile',
        sendToAddress: formatted,
      });
    } catch (e) {
      if (e instanceof UniquenessError) {
        formActions.setFieldError('value', api.userMessages.phone.taken);
      } else {
        Alert.showGenericError();
      }
    } finally {
      formActions.setSubmitting(false);
    }
  };

  return (
    <SingleValueForm
      initialValue={displayPhone}
      onSubmit={handleFormSubmit}
      validation={validations.phone}
      title="Enter your mobile number"
      keyboardType="numeric"
      label="Your mobile number"
      maskProps={{
        type: 'custom',
        options: {
          mask: '(999)-999-9999',
        },
      }}
    />
  );
};

export default AddPhoneNumber;
