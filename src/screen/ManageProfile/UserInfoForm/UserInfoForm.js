import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import TextInput from '/component/TextInput';
import DateInput from '/component/DateInput';
import * as events from '/constants/events/ManageProfiles/manageProfile';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import styles from './UserInfoForm.styles';

const UserInfoForm = ({ formProps }) => {
  const { values, handleChange, errors } = formProps;
  const dispatch = useDispatch();

  const handleBlurInput = (event) => () => {
    dispatch(trackEvent(event));
  };

  return (
    <View style={styles.root}>
      <TextInput
        label="First Name"
        onChangeText={handleChange('firstName')}
        style={styles.input}
        value={values.firstName}
        errorMessage={errors.firstName}
        returnKeyType="next"
        blurOnSubmit={false}
        onFocus={handleBlurInput(events.CLICK_FIRST_NAME)}
      />

      <TextInput
        label="Last Name"
        onChangeText={handleChange('lastName')}
        style={styles.input}
        value={values.lastName}
        errorMessage={errors.lastName}
        returnKeyType="next"
        blurOnSubmit={false}
        onFocus={handleBlurInput(events.CLICK_LAST_NAME)}
      />

      <DateInput
        label="Date of Birth"
        onChangeText={handleChange('dob')}
        style={styles.input}
        value={values.dob}
        errorMessage={errors.dob}
        returnKeyType="done"
        onFocus={handleBlurInput(events.CLICK_DOB)}
      />
    </View>
  );
};

export default UserInfoForm;
