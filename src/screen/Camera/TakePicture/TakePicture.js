import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Linking,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

import FullScreenSpinner from '/partial/FullScreenSpinner';
import AskPermission from '/partial/AskPermission';
import TakePictureFooter from './TakePictureFooter';
import RetakeFooter from './RetakeFooter';

import { camera as cameraMessage } from '/api/userMessages';
import { UseLightStatusBar } from '/util/statusBar';

import styles, { FOCUS_SIZE } from './TakePicture.styles';
import sharedStyles from '/screen/Camera/Camera.styles';

const FLASH_KEY = 'CAMERA::FLASH_MODE';
const { width, height } = Dimensions.get('window');

const TakePicture = ({ onSelect, switchPage, dismiss }) => {
  const [focusPointAnimation] = useState(new Animated.Value(0));
  const [flashOn, setFlashOn] = useState(false);
  const [focus, setFocus] = useState(null);
  const [imageData, setImageData] = useState(null);

  // We will just manage the flash persisted state here since
  // afaik this is the only component that will care about it
  useEffect(() => {
    const checkFlashMode = async () => {
      if (await AsyncStorage.getItem(FLASH_KEY)) {
        setFlashOn(true);
      }
    };

    checkFlashMode();
  }, []);

  const takePicture = (camera) => async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        fixOrientation: true, // Android only
        pauseAfterCapture: true,
        quality: 0.8,
      });

      setImageData(data);
      focusPointAnimation.setValue(0);
    }
  };

  const handleContinuePress = () => {
    onSelect(imageData);
  };

  const handleRetakePress = (camera) => () => {
    camera.resumePreview();
    setImageData(null);
  };

  const handleShowSettingsPress = () => {
    Linking.openSettings();
  };

  const handlePermissionCancel = () => {
    dismiss();
  };

  const handleCameraRollPress = () => {
    switchPage();
  };

  const handleFlashPress = () => {
    const newValue = !flashOn;
    setFlashOn(newValue);
    // Persist the flash value in async storage. Dont do anything if this call fails
    try {
      if (newValue) {
        AsyncStorage.setItem(FLASH_KEY, 'YES');
      } else {
        AsyncStorage.removeItem(FLASH_KEY);
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const flashMode = RNCamera.Constants.FlashMode[flashOn ? 'on' : 'off'];

  let autoFocusPointOfInterest;

  if (focus) {
    autoFocusPointOfInterest = { ...focus, autoExposure: true };
  }

  // When the camera is pressed we want to show the point with the little
  // focus animation. RNCamera expects the focus point to be in the format:
  // {x: [0 -> 1], y: [0 -> 1]}, which is why we are dividing by width and height
  const handleCameraPress = (e) => {
    if (imageData) return;

    const x = e.nativeEvent.pageX / width;
    const y = e.nativeEvent.pageY / height;

    setFocus({ x, y });

    // Immediately hide the focus point
    focusPointAnimation.setValue(0);

    // And then immediately start an animation to show it
    Animated.spring(focusPointAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const focusPointStyle = [
    styles.focusPoint,
    focus && {
      left: focus.x * width - FOCUS_SIZE / 2,
      top: focus.y * height - FOCUS_SIZE / 2,
    },
    {
      opacity: focusPointAnimation,
      transform: [{
        scale: focusPointAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.4, 1],
        }),
      }],
    },
  ];

  return (
    <View>
      <UseLightStatusBar />
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={flashMode}
        captureAudio={false}
        autoFocusPointOfInterest={autoFocusPointOfInterest}
        androidCameraPermissionOptions={{
          title: cameraMessage.permission.title,
          message: cameraMessage.permission.description,
          buttonPositive: cameraMessage.permission.buttonPositive,
          buttonNegative: cameraMessage.permission.buttonNegative,
        }}
      >
        {({ camera, status }) => {
          // Status will be not authorized if a user **denies** permission
          if (status === 'NOT_AUTHORIZED') {
            return (
              <AskPermission
                onConfirmPress={handleShowSettingsPress}
                confirmText="Open my settings"
                onCancelPress={handlePermissionCancel}
                title="You need to grant Huddle permission to use your camera."
                style={sharedStyles.askPermission}
              />
            );
          }

          // Status will be pending until a user accepts/denies permission
          if (status === 'PENDING_AUTHORIZATION') {
            return (
              <FullScreenSpinner visible />
            );
          }

          return (
            <TouchableWithoutFeedback onPress={handleCameraPress}>
              <View style={styles.controls}>
                <View style={{ flex: 1 }} />
                {!imageData && (
                  <TakePictureFooter
                    camera={camera}
                    takePicture={takePicture(camera)}
                    onFlashPress={handleFlashPress}
                    onCameraRollPress={handleCameraRollPress}
                    flashOn={flashOn}
                  />
                )}

                {!!imageData && (
                  <RetakeFooter
                    onRetakePress={handleRetakePress(camera)}
                    onContinuePress={handleContinuePress}
                  />
                )}

                <Animated.View style={focusPointStyle} pointerEvents="none" />
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default TakePicture;
