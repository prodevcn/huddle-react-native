import React, { useRef, useState, useEffect } from 'react';
import {
  Platform,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import { object } from 'yup';
// We don't want to use the KeyboardManager in this component,
// we want full control over handling the keyboard
import KeyboardManager from 'react-native-keyboard-manager';
import { useDispatch } from 'react-redux';

// We will use the keyboard spacer to move the button up, above the keyboard
import KeyboardSpacer from 'react-native-keyboard-spacer';

import globalStyles from '/styles';
import Button from '/component/Button';
import Icon from '/component/Icon';

import { REQUIRED_LABEL } from '/constants/config';
import styles, { buttonBottomMargin } from './ModalTextArea.styles';
import * as events from '/constants/events/Items/editNote';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { actions } from '/state/overlays';

import { validations } from '/util';
import { setBarStyle } from '/util/statusBar';

const { height } = Dimensions.get('window');

const defaultPlaceholder = 'Please describe your issue...';

const ModalTextArea = ({
  value,
  onSubmit,
  placeholder = defaultPlaceholder,
  showTitle,
  title,
  titlePlaceholder,
  buttonText = 'Continue',
  animation,
}) => {
  const [boxHeight, setBoxHeight] = useState(height);

  const inputRef = useRef(null);
  const titleRef = useRef(null);

  const dispatch = useDispatch();

  // When the component mounts, animate the modal
  useEffect(() => {
    // We don't want this input to move when the keyboard comes up
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(false);
    }
  }, []);

  // Run the hide animation on the modal, then pop the view
  const handleClose = () => {
    dispatch(trackEvent(events.CLICK_CANCEL));

    if (titleRef.current) {
      titleRef.current.blur();
    }

    inputRef.current.blur();
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }
    setBarStyle('dark-content');
    dispatch(actions.dismiss());
  };

  const handleSubmit = async (values, formActions) => {
    dispatch(trackEvent(events.CLICK_CONTINUE));

    try {
      await onSubmit(values);
      handleClose();
      formActions.setSubmitting(false);
    } catch (e) {
      formActions.setSubmitting(false);
    }
  };

  // Get the height of the white background so we can precisely animate it's Y pos
  const handleBoxLayout = (e) => {
    setBoxHeight(e.nativeEvent.layout.height);
  };

  const handleTitleSubmit = () => {
    inputRef.current.focus();
  };

  const boxStyle = [
    styles.box,
    {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [boxHeight, 0],
          }),
        },
      ],
    },
  ];

  const initialValues = { value };
  let validationSchema;
  if (showTitle) {
    initialValues.title = title;
    validationSchema = object().shape({
      title: validations.string.required(REQUIRED_LABEL),
    });
  }

  // When the keyboard is open on an iPhoneX the space below the button is big
  // (~40px), which is a huge waste of space, and looks bad. This will make it so
  // that the bottom spacing **when the keyboard is visible** is 24 - always,
  // regardless of which device we are on.
  const keyboardTopSpacing = -(buttonBottomMargin) + 24;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit: handlePress,
          values,
          isSubmitting,
          errors,
        }) => {
          const titlePlaceholderColor = errors.title
            ? globalStyles.palette.orange
            : globalStyles.palette.grey01;

          return (
            <Animated.View
              style={boxStyle}
              onLayout={handleBoxLayout}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Icon
                  name="cross"
                  size={26}
                  color={globalStyles.palette.deepBlue}
                />
              </TouchableOpacity>
              {
                !!showTitle && (
                  <TextInput
                    style={styles.title}
                    value={values.title}
                    placeholder={titlePlaceholder}
                    placeholderTextColor={titlePlaceholderColor}
                    onChangeText={handleChange('title')}
                    blurOnSubmit={false}
                    onSubmitEditing={handleTitleSubmit}
                    returnKeyType="next"
                    ref={titleRef}
                    allowFontScaling={false}
                  />
                )
              }
              <TextInput
                value={values.value}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={globalStyles.palette.grey01}
                multiline
                numberOfLines={5}
                onChangeText={handleChange('value')}
                ref={inputRef}
                allowFontScaling={false}
              />
              <Button
                type="primary"
                size="large"
                onPress={handlePress}
                text={buttonText}
                style={styles.continueButton}
                loading={isSubmitting}
                disabled={showTitle && !values.title}
              />
              {Platform.OS === 'ios' && (
                <KeyboardSpacer topSpacing={keyboardTopSpacing} />
              )}
            </Animated.View>
          );
        }}
      </Formik>
    </>
  );
};

export default ModalTextArea;
