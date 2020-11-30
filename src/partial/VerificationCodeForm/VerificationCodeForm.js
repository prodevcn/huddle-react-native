import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useDispatch } from 'react-redux';
import Config from 'react-native-config';

import api from '/api';
import Text from '/component/Text';
import TextInput from '/component/TextInput';
import FullScreenSpinner from '/partial/FullScreenSpinner';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import Alert from '/overlay/Alert';
import styles from './VerificationCodeForm.styles';

const VerificationCodeForm = ({
  navigation,
  sendToAddress,
  type,
  onSuccessfulPinCheck,
  onFallbackPress,
  onComplete,
  getValidationCode,
  screenName,
  nextRoute,
  nextRouteParams = {},
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationCode, setValidationCode] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getVerificationCode = async () => {
      try {
        const response = await api.user.getVerificationCode(type, sendToAddress);
        setValidationCode(response.validationCode);
      } catch (e) {
        // If there is an error here that means that the server could not
        // send the SMS or email. Not much that we can do here on the front end...
        Alert.showGenericError();
      }
    };

    getVerificationCode();
  }, []);

  useEffect(() => {
    if (!visible) {
      setSuccess(false);
    }
  }, [visible]);

  // When our code changes, check to see if it is valid
  useEffect(() => {
    // Clear the error and don't do anything else if count < 4
    if (code.length < 6) {
      if (error) {
        setError(null);
      }
      return;
    }

    if (screenName) {
      dispatch(trackEvent(`${screenName}: Entered`));
    }

    const checkPin = async () => {
      setVisible(true);

      try {
        const response = await api.user.verify(type, sendToAddress, code, validationCode);

        if (screenName) {
          dispatch(trackEvent(`${screenName}: Succeeded`));
        }

        if (getValidationCode) {
          getValidationCode(response.validationCode);
        }

        if (onSuccessfulPinCheck) {
          await onSuccessfulPinCheck();
        }

        setSuccess(true);

        // Keep the checkmark on the screen for 750ms
        setTimeout(() => {
          if (nextRoute) {
            navigation.push(nextRoute, nextRouteParams);
          }

          setVisible(false);

          if (onComplete) {
            onComplete();
          }
        }, 750);
      } catch (e) {
        setVisible(false);
        setError(api.userMessages.verificationCode.invalidVerificationCode.title);

        if (screenName) {
          dispatch(trackEvent(`${screenName}: Failed`));
        }
      }
    };

    checkPin();
  }, [code]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text.H2 testID="verification-code-form-title">
        Enter your
        {'\n'}
        verification code
      </Text.H2>

      <Text
        style={styles.subtitle}
        color="medium"
      >
        We&apos;ve sent this to
        {' '}
        <Text weight="medium" color="medium">
          {sendToAddress}
        </Text>
      </Text>

      <TextInput
        keyboardType="phone-pad"
        placeholder="eg: 123456"
        value={code}
        onChangeText={setCode}
        maxLength={6}
        errorMessage={error}
        style={styles.input}
        autoFocus={Config.DETOX_ENV === 'false'}
        blurOnSubmit={false}
        testID="verification-code-form"
      />

      <TouchableOpacity style={styles.button} onPress={onFallbackPress}>
        <Text.BodySmall>Haven’t received your code?</Text.BodySmall>
      </TouchableOpacity>

      <FullScreenSpinner visible={visible} success={success} />
    </ScrollView>
  );
};

export default withNavigation(VerificationCodeForm);
