import React from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import { object } from 'yup';
import { connect } from 'react-redux';

import Alert from '/overlay/Alert';
import Button from '/component/Button';
import DateInput from '/component/DateInput';
import Text from '/component/Text';
import TextInput from '/component/TextInput';

import screens from '/screen';
import { format, validations } from '/util';
import { actions, selectors } from '/state/onboarding';
import { actions as mixpanelActions, selectors as mixpanelSelectors } from '/state/mixpanel';
import * as events from '/constants/events/Onboarding/selfPersonalDetails';
import api from '/api';
import { REQUIRED_LABEL } from '/constants/config';

import showBiometrics from '/navigation/helpers/showBiometrics';

import onboardingStyles from '/screen/Onboarding/Onboarding.styles';
import styles from './EnterInfo.styles';

const initialValues = {
  firstName: '',
  lastName: '',
  dob: '',
};

const validationSchema = object().shape({
  firstName: validations.string.required(REQUIRED_LABEL),
  lastName: validations.string.required(REQUIRED_LABEL),
  dob: validations.date.required(REQUIRED_LABEL),
});

const EnterInfo = React.memo(({
  addFormData, // selector via connect
  masterSuggestionData, // selector via connect
  navigation,
  register, // selector via connect
  registerProfile,
  setGroup, // action via connect
  setUserPropOnce, // action via connect
  referrer, // selector via connect
  trackEvent, // selector via connect
}) => {
  const dependentType = navigation.getParam('dependentType');
  let dateRef;
  let lastNameRef;

  // This will create a new account for the current user
  const createUser = async (values, formActions) => {
    const isCareTeamInvite = navigation.getParam('isCareTeamInvite');
    addFormData(values);

    const additionalData = {
      // link CareGiver profile to master profile for Link import Health Summary items
      suggestionUniqueName: masterSuggestionData.suggestionUniqueName,
    };

    try {
      await register(additionalData);
      if (isCareTeamInvite) {
        trackEvent(events.ACCOUNT_CREATED_INVITE);
        if (!referrer) {
          setUserPropOnce({ referrer: 'invite-careteam' });
          setGroup('referrer', 'invite-careteam');
        }
        showBiometrics(navigation, true);
      } else {
        trackEvent(events.ACCOUNT_CREATED);
        if (!referrer) {
          setUserPropOnce({ referrer: 'organic' });
          setGroup('referrer', 'organic');
        }
        navigation.push(screens.OnboardingCaregiver, { onboardingFlow: true });
      }
    } catch (e) {
      if (e.message.match(/birthday|dob/i)) {
        formActions.setFieldError('dob', api.userMessages.date.invalid);
      } else {
        Alert.error(api.userMessages.regist.failed);
      }
    }
  };

  // This will create somebody that the current user will care for
  const addProfile = async (values, formActions) => {
    const onboardingFlow = navigation.getParam('onboardingFlow');

    const data = {
      ...values,
      dob: format.appDateToAPIDate(values.dob),
    };

    try {
      await registerProfile(data, dependentType);

      if (onboardingFlow) {
        showBiometrics(navigation, true);
      } else {
        // We are not in the onboarding stack, so we do not want to use the
        // normal `onboardingHelper.dismiss(navigation)`
        navigation.dismiss();
      }
    } catch (e) {
      if (e.status === api.errorCodes.INVALID_DATE) {
        formActions.setFieldError('dob', api.userMessages.date.invalid);
      } else {
        Alert.error(api.userMessages.registProfile.failed);
      }
    }
  };

  const handleOnSubmit = async (values, formActions) => {
    trackEvent(events.CLICK_CONTINUE);

    if (dependentType) {
      await addProfile(values, formActions);
    } else {
      await createUser(values, formActions);
    }

    formActions.setSubmitting(false);
  };

  let title = 'We just need a few details about you';

  if (dependentType) {
    title = "We'll need a few details about them";
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({
        handleChange,
        handleSubmit: handlePress,
        isValid,
        isSubmitting,
        errors,
        values,
      }) => (
        <ScrollView
          contentContainerStyle={onboardingStyles.content}
          keyboardShouldPersistTaps="handled"
          testID="enter-info-form"
        >
          <Text.H2 style={styles.title}>{title}</Text.H2>
          <TextInput
            label="First Name"
            onChangeText={handleChange('firstName')}
            autoCapitalize="words"
            style={styles.input}
            value={values.firstName}
            errorMessage={errors.firstName}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.focus()}
            blurOnSubmit={false}
            testID="first-name"
          />

          <TextInput
            label="Last Name"
            onChangeText={handleChange('lastName')}
            autoCapitalize="words"
            style={styles.input}
            value={values.lastName}
            errorMessage={errors.lastName}
            returnKeyType="next"
            getInputRef={(ref) => {
              lastNameRef = ref;
            }}
            onSubmitEditing={() => dateRef.focus()}
            blurOnSubmit={false}
            testID="last-name"
          />

          <DateInput
            label="Date of Birth"
            onChangeText={handleChange('dob')}
            autoCapitalize="words"
            style={styles.input}
            value={values.dob}
            errorMessage={errors.dob}
            returnKeyType="done"
            getInputRef={(ref) => {
              dateRef = ref;
            }}
            onSubmitEditing={() => isValid && handlePress()}
            testID="dob"
          />

          <Button
            text="Continue"
            onPress={handlePress}
            style={styles.button}
            disabled={!isValid}
            loading={isSubmitting}
            testID="enter-info-form-continue"
          />
        </ScrollView>
      )}
    </Formik>
  );
});

EnterInfo.navigationOptions = ({ navigation }) => {
  const showBack = navigation.getParam('showBack');

  if (!showBack) {
    return { headerLeft: null };
  }

  return {};
};

export default connect(
  (state) => ({
    masterSuggestionData: selectors.suggestionDataSelector(state),
    referrer: mixpanelSelectors.makeSelectMixpanelReferrer(state),
  }),
  {
    addFormData: actions.addFormData,
    register: actions.register,
    registerProfile: actions.registerProfile,
    setGroup: mixpanelActions.setGroup,
    setUserPropOnce: mixpanelActions.setUserPropOnce,
    trackEvent: mixpanelActions.trackEvent,
  },
)(EnterInfo);
