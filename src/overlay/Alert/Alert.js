import React, { useRef, useEffect } from 'react';
import { Keyboard, Dimensions, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AlertPopup from '/component/Alert';
import { store } from '/state/store';
import { selectors, actions } from '/state/alerts';

import styles from './Alert.styles';

import api from '/api';
import useAnimation from '/hook/useAnimation';

const { height } = Dimensions.get('window');

const Alert = () => {
  const { animation, toStart, toEnd } = useAnimation();
  const alert = useSelector(selectors.activeAlertSelector);
  const dispatch = useDispatch();
  const timeoutHandle = useRef(null);

  const {
    title,
    description,
    type,
    duration = 3000,
    onPress,
  } = alert || {};

  // After the hide animation finishes pop the entire screen
  const hide = () => {
    toStart(() => {
      dispatch(actions.dismiss());
    });
    clearTimeout(timeoutHandle.current);
  };

  const show = () => {
    // Make sure the keyboard disappears before we show our alert - it will cover the alert
    Keyboard.dismiss();
    toEnd(() => {
      // After the duration hide the alert. But check if `visible` is true first to
      // avoid trying to set state of an unmounted component
      timeoutHandle.current = setTimeout(() => {
        hide();
      }, duration);
    });
  };

  // When visible changes to false, hide the alert
  useEffect(() => {
    if (!alert) {
      hide();
    } else {
      show();
    }
  }, [alert]);

  // Fade in and slightly transition up
  const alertStyle = [
    styles.alert,
    {
      opacity: animation,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 0],
          }),
        },
      ],
    },
  ];

  const handlePress = () => {
    if (onPress) {
      onPress();
    }

    hide();
  };

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <AlertPopup
        title={title}
        description={description}
        type={type}
        isVisible={!!alert}
        style={alertStyle}
        onPress={handlePress}
      />
    </View>
  );
};

// We want the user to be able to swipe down anywhere on the screen to dismiss
// This makes it feel like the user can swipe down on the alert - even though
// it's really just a hack
Alert.navigationOptions = {
  gestureResponseDistance: { vertical: height },
};

// Add helper methods to make it easier to show an Alert
// Note: You cannot use these in redux action files. You need to
// manually dispatch `alert.actions.js#show`.
Alert.general = ({ title, description, duration }, options = {}) => {
  store.dispatch(actions.show({
    title,
    description,
    duration,
    type: 'general',
    ...options,
  }));
};

Alert.error = ({ title, description, duration }, options = {}) => {
  store.dispatch(actions.show({
    title,
    description,
    duration,
    type: 'warning',
    ...options,
  }));
};

Alert.success = ({ title, description, duration }, options = {}) => {
  store.dispatch(actions.show({
    title,
    description,
    duration,
    type: 'success',
    ...options,
  }));
};

Alert.showGenericError = (options) => {
  Alert.error(api.userMessages.generic, options);
};

export default Alert;
