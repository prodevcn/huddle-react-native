import React, { useState } from 'react';
import { Formik } from 'formik';
import { object } from 'yup';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import Text from '/component/Text';
import TextInput from '/component/TextInput';
import Button from '/component/Button';
import Icon from '/component/Icon';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import FullScreenSpinner from '/partial/FullScreenSpinner';

import { REQUIRED_LABEL } from '/constants/config';
import * as helpDeskActions from '/state/helpDesk/helpDesk.actions';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as events from '/constants/events/SettingsAndHelp/submitTicket';
import { validations } from '/util';
import IssueForm from './IssueForm';
import styles, { pickerStyles } from './HelpDesk.styles';

const OPTIONS = [
  { label: 'Account', value: 'account' },
  { label: 'Health Records', value: 'health records' },
  { label: 'Sharing', value: 'sharing' },
  { label: 'Other', value: 'other' },
];

const validationSchema = object().shape({
  issue: validations.string.required(REQUIRED_LABEL),
  email: validations.email.required(REQUIRED_LABEL),
  summary: validations.string.required(REQUIRED_LABEL),
});

const ChevronIcon = () => <Icon name="chevron-down" size={16} />;

const PICKER_PLACEHOLDER = { label: 'What can we help you with?', value: null };

const HelpDesk = ({
  submitTicket,
  trackEvent,
  navigation,
}) => {
  const [visibleSpinner, setVisibleSpinner] = useState(false);
  const [successSpinner, setSuccessSpinner] = useState(false);

  const initialValues = {
    issue: '',
    email: navigation.getParam('initialEmail') || '',
    summary: null,
  };

  const handleSubmitForm = (values, formActions) => {
    setVisibleSpinner(true);
    trackEvent(events.CLICK_SUBMIT);

    submitTicket(values).then(() => {
      setSuccessSpinner(true);

      setTimeout(() => {
        setVisibleSpinner(false);
        formActions.setSubmitting(false);
        navigation.pop();
      }, 750);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={validationSchema}
      validateOnMount
    >
      {(props) => {
        const handleSelectChange = (value) => {
          trackEvent(events.CLICK_WHAT_CAN_WE_HELP_YOU_WITH);
          props.handleChange('summary')(value);
        };

        return (
          <>
            <BottomButtonLayout
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              control={(
                <Button
                  type="primary"
                  size="large"
                  onPress={props.handleSubmit}
                  text="Submit"
                  disabled={!props.isValid}
                  loading={props.isSubmitting}
                />
              )}
            >
              <Text.H1>Submit a ticket</Text.H1>

              <Text color="medium" style={styles.subtitle}>
                Please verify your email and phone number so we can contact you and provide the best
                support possible.
              </Text>

              <RNPickerSelect
                placeholder={PICKER_PLACEHOLDER}
                style={pickerStyles}
                Icon={ChevronIcon}
                onValueChange={handleSelectChange}
                items={OPTIONS}
              />

              <TextInput
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                label="Email"
                style={styles.input}
                errorMessage={props.errors.email}
              />

              <IssueForm navigation={navigation} formProps={props} />
            </BottomButtonLayout>
            <FullScreenSpinner visible={visibleSpinner} success={successSpinner} />
          </>
        );
      }}
    </Formik>
  );
};

export default connect(
  null,
  {
    ...helpDeskActions,
    trackEvent: mixpanelActions.trackEvent,
  },
)(HelpDesk);
