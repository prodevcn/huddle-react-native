import * as React from 'react';
import { connect } from 'react-redux';

import UniquenessError from '/api/errors/UniquenessError';
import SingleValueForm from '/partial/SingleValueForm';
import Alert from '/overlay/Alert';
import screens from '/screen';
import { validations } from '/util';
import { actions } from '/state/onboarding';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as emailEvents from '/constants/events/Onboarding/email';

const EnterEmail = ({
  changeFlow, // action
  lookup,
  addFormData,
  flow,
  navigation,
  trackEvent,
}) => {
  const isSignup = flow === 'signup';
  const subtitle = isSignup
    ? "If you haven't created an account yet, we'll help you get that set up."
    : '';
  const isResetPinFlow = navigation.getParam('isResetPinFlow');

  const handleCtaPress = () => {
    trackEvent(emailEvents.CLICK_USE_MOBILE_NUMBER);
    navigation.pop();
  };

  // We always want to go to the verify email form if the form is submitted
  const handleFormSubmit = async ({ value }, formActions) => {
    trackEvent(emailEvents.CLICK_CONTINUE);

    try {
      // If we are in the signup flow call `lookup` which will act as a uniqueness check
      if (isSignup) {
        await lookup({ email: value });
      }
    } catch (e) {
      if (e instanceof UniquenessError) {
        changeFlow('login');
      } else {
        Alert.showGenericError();
        formActions.setSubmitting(false);
        return;
      }
    }

    addFormData({ email: value, mobile: undefined });
    navigation.push(screens.OnboardingVerify, { sendToAddress: value, type: 'email', isResetPinFlow });
  };

  return (
    <SingleValueForm
      onSubmit={handleFormSubmit}
      ctaPress={handleCtaPress}
      ctaIcon="phone"
      ctaText="Use your mobile number instead"
      validation={validations.email}
      title="What is your email?"
      subtitle={subtitle}
      keyboardType="email-address"
      label="Your email address"
      blurOnSubmit={false}
      ctaTestID="use-mobile-number"
    />
  );
};

EnterEmail.navigationOptions = {
  headerLeft: null,
};

export default connect(
  (state) => ({
    flow: state.onboarding.flow,
  }),
  {
    addFormData: actions.addFormData,
    changeFlow: actions.changeFlow,
    trackEvent: mixpanelActions.trackEvent,
    lookup: actions.lookup,
  },
)(EnterEmail);
