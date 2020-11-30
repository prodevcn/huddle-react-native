import React from 'react';
import { connect } from 'react-redux';

import screens from '/screen';
import VerificationCodeForm from '/partial/VerificationCodeForm';
import { actions } from '/state/onboarding';
import { SCREEN_NAME } from '/constants/events/Onboarding/verificationCode';
import { secureStorage } from '/util';

const Verify = ({ navigation, flow }) => {
  const sendToAddress = navigation.getParam('sendToAddress');
  /** @type {('email'|'mobile')} */
  const type = navigation.getParam('type');
  const isResetPinFlow = navigation.getParam('isResetPinFlow');

  let nextRoute = screens.OnboardingEnterPin;
  const nextRouteParams = {};

  if (!isResetPinFlow && flow === 'login') {
    nextRoute = screens.OnboardingPinLogin;
  }

  const onGetValidationCode = (validationCode) => {
    secureStorage.setValidationCode(validationCode);
  };

  return (
    <VerificationCodeForm
      sendToAddress={sendToAddress}
      type={type}
      onFallbackPress={() => navigation.pop()}
      getValidationCode={onGetValidationCode}
      screenName={SCREEN_NAME}
      nextRoute={nextRoute}
      nextRouteParams={nextRouteParams}
    />
  );
};

Verify.navigationOptions = {
  headerLeft: null,
};

export default connect(
  (state) => ({
    flow: state.onboarding.flow,
  }),
  {
    addFormData: actions.addFormData,
  },
)(Verify);
