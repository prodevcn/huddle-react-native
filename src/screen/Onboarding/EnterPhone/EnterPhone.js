import React from 'react';
import { connect } from 'react-redux';

import UniquenessError from '/api/errors/UniquenessError';
import SingleValueForm from '/partial/SingleValueForm';
import Alert from '/overlay/Alert';
import screens from '/screen';
import { format, validations } from '/util';
import { actions } from '/state/onboarding';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as mobileNumberEvents from '/constants/events/Onboarding/mobileNumber';

const EnterPhone = ({
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

  const handleFormSubmit = async ({ value }, formActions) => {
    trackEvent(mobileNumberEvents.CLICK_CONTINUE);
    const formatted = format.phone(value);

    try {
      // If we are in the signup flow call `lookup` which will act as a uniqueness check
      if (isSignup) {
        await lookup({ mobile: formatted });
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

    // Api expects a phone number in the format 2505921234
    addFormData({ mobile: formatted, email: undefined });

    navigation.push(screens.OnboardingVerify, {
      type: 'mobile',
      sendToAddress: formatted,
      isResetPinFlow,
    });
  };

  // If the user presses the CTA to use their email instead, this flag will be passed into
  // the email form which will tell the email form to pop instead of push if the user hits
  // the "use phone instead" CTA
  const gotoEmailScreen = () => {
    trackEvent(mobileNumberEvents.CLICK_USE_EMAIL);
    navigation.push(screens.OnboardingEnterEmail, { isResetPinFlow });
  };

  return (
    <SingleValueForm
      onSubmit={handleFormSubmit}
      ctaPress={gotoEmailScreen}
      ctaIcon="mail"
      ctaText="Use your email address instead"
      validation={validations.phone}
      title="What is your mobile number?"
      subtitle={subtitle}
      keyboardType="numeric"
      label="Your mobile number"
      blurOnSubmit={false}
      maskProps={{
        type: 'custom',
        options: {
          mask: '(999)-999-9999',
        },
      }}
      ctaTestID="use-email-address"
    />
  );
};

EnterPhone.navigationOptions = {
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
)(EnterPhone);
