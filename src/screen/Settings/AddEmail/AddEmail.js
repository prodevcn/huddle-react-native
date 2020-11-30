import React from 'react';
import { useDispatch } from 'react-redux';

import UniquenessError from '/api/errors/UniquenessError';
import screens from '/screen';
import SingleValueForm from '/partial/SingleValueForm';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import Alert from '/overlay/Alert';
import api from '/api';
import * as changeEmailEvents from '/constants/events/SettingsAndHelp/changeEmail';
import { validations } from '/util';
import { EMAIL_REGEXP } from '/util/validations';

const AddEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const initialEmail = navigation.getParam('initialEmail');
  const displayEmail = EMAIL_REGEXP.test(initialEmail) ? initialEmail : '';

  const handleFormSubmit = async ({ value }, formActions) => {
    dispatch(trackEvent(changeEmailEvents.CLICK_CONTINUE));

    try {
      // Check to see if the email is already taken
      await api.user.lookup({ email: value });

      navigation.push(screens.SettingsVerify, {
        type: 'email',
        sendToAddress: value,
      });
    } catch (e) {
      if (e instanceof UniquenessError) {
        formActions.setFieldError('value', api.userMessages.email.taken);
      } else {
        Alert.showGenericError();
      }
    } finally {
      formActions.setSubmitting(false);
    }
  };

  return (
    <SingleValueForm
      onSubmit={handleFormSubmit}
      validation={validations.email}
      title="Enter your email"
      keyboardType="email-address"
      label="Your email address"
      initialValue={displayEmail}
    />
  );
};

export default AddEmail;
