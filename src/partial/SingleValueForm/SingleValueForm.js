/**
 * Use this component to render a form that has a single input
 *
 * Optional components on the screen are:
 *   - subtitle
 *   - cta icon
 *   - cta all together
 */
import React, { useRef } from 'react';

import { Formik } from 'formik';
import { NavigationEvents } from 'react-navigation';
import { Platform, ScrollView } from 'react-native';
import { object } from 'yup';

import Button from '/component/Button';
import Text from '/component/Text';
import TextInput from '/component/TextInput';
import Link from '/component/Link';

import { REQUIRED_LABEL } from '/constants/config';
import styles from './SingleValueForm.styles';

const SingleValueForm = ({
  // Title props
  title,
  subtitle,
  // CTA props
  ctaPress,
  ctaIcon,
  ctaText,
  ctaTestID,
  // Form props
  initialValue = '',
  validation,
  onSubmit,
  // Input props
  keyboardType,
  label,
  maskProps,
  blurOnSubmit,
  maxLength,
}) => {
  const inputRef = useRef(null);

  const validationSchema = object().shape({
    value: validation.required(REQUIRED_LABEL),
  });

  const hasCta = (ctaText || ctaIcon) && ctaPress;

  const handleDidFocus = () => {
    inputRef.current.focus();
  };

  const getInputRef = (ref) => {
    inputRef.current = ref;
  };

  // There was a UI flicker on Android when transitioning to this screen
  // from the Onboarding Landing page, which is why we are doing
  // the conditional autoFocus'ing and `onDidFocus`

  return (
    <Formik
      initialValues={{ value: initialValue }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({
        errors, handleChange, handleSubmit: handlePress, isValid, values, isSubmitting,
      }) => (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {Platform.OS === 'android' && <NavigationEvents onDidFocus={handleDidFocus} />}
          <Text.H1>{title}</Text.H1>

          {!!subtitle && (
            <Text color="medium" style={styles.instruction}>
              {subtitle}
            </Text>
          )}

          <TextInput
            returnKeyType="done"
            label={label}
            onChangeText={handleChange('value')}
            errorMessage={errors.value}
            keyboardType={keyboardType}
            onSubmitEditing={() => isValid && handlePress()}
            value={values.value}
            style={[!subtitle && styles.inputNoSubtitle]}
            maskProps={maskProps}
            blurOnSubmit={blurOnSubmit}
            getInputRef={getInputRef}
            autoFocus={Platform.OS === 'ios'}
            maxLength={maxLength}
            testID="single-value-form"
          />

          <Button
            onPress={handlePress}
            disabled={!(isValid && values.value)}
            size="large"
            text="Continue"
            testID="continue"
            style={styles.button}
            loading={isSubmitting}
          />

          {!!hasCta && (
            <Link
              text={ctaText}
              icon={ctaIcon}
              onPress={ctaPress}
              style={styles.cta}
              testID={ctaTestID}
            />
          )}
        </ScrollView>
      )}
    </Formik>
  );
};

export default SingleValueForm;
