import React from 'react';
import { connect } from 'react-redux';

import api from '/api';
import VerificationCodeForm from '/partial/VerificationCodeForm';
import { masterProfileSelector } from '/state/profiles/profiles.selectors';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as changeEmail from '/constants/events/SettingsAndHelp/changeEmailVerificationCode';
import * as changeMobileNumber from '/constants/events/SettingsAndHelp/changeMobileNumberVerificationCode';
import { updateCustomField } from '/state/profiles/profiles.actions';
import secureStorage from '/util/secureStorage';
import Alert from '/overlay/Alert';

const SettingsVerify = ({
  navigation, profileCode, custom, trackEvent, ...props
}) => {
  // Email or Phone number
  const sendToAddress = navigation.getParam('sendToAddress');
  /** @type {('email'|'mobile')} */
  const type = navigation.getParam('type');

  const currentScreenName = type === 'email' ? changeEmail.SCREEN_NAME : changeMobileNumber.SCREEN_NAME;

  const updateProfile = async () => {
    try {
      const newCustom = {
        ...custom,
        [type]: sendToAddress,
      };

      const validationCode = await secureStorage.getValidationCode();

      await api.user.update({
        [type]: sendToAddress,
        custom: JSON.stringify(newCustom),
        validationCode,
      });

      props.updateCustomField({
        profileCode,
        newCustomField: newCustom,
      });

      if (type === 'email') {
        trackEvent(changeEmail.EMAIL_CHANGED);
      } else {
        trackEvent(changeMobileNumber.MOBILE_NUMBER_CHANGED);
      }
    } catch (err) {
      Alert.showGenericError();
      navigation.pop();
    }
  };

  const handleOnComplete = () => {
    navigation.popToTop();
    // This timeout is a bit of a magic number - just to give the screen enough time to pop
    setTimeout(() => {
      const updatedField = type === 'email' ? 'email address' : 'phone number';
      Alert.success({ title: 'Success!', description: `You've changed your ${updatedField}` });
    }, 350);
  };

  const handleValidationCode = async (code) => {
    await secureStorage.setValidationCode(code);
  };

  return (
    <VerificationCodeForm
      sendToAddress={sendToAddress}
      type={type}
      onSuccessfulPinCheck={updateProfile}
      onComplete={handleOnComplete}
      screenName={currentScreenName}
      onFallbackPress={() => navigation.pop()}
      getValidationCode={handleValidationCode}
    />
  );
};

export default connect(
  masterProfileSelector,
  { updateCustomField, trackEvent: mixpanelActions.trackEvent },
)(SettingsVerify);
