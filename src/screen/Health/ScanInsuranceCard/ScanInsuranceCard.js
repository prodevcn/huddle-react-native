import React, { useState, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationEvents } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import ImageEditor from '@react-native-community/image-editor';
import ImageResizer from '/util/react-native-image-resizer';
import RNFS from 'react-native-fs';

import Alert from '/overlay/Alert';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import Button from '/component/Button';
import FullScreenSpinner from '/partial/FullScreenSpinner';
import ScanInsuranceInstructions from './ScanInsuranceInstructions';
import ScanInsurancePermissions from './ScanInsurancePermissions';

import api from '/api';
import { camera as cameraMessage } from '/api/userMessages';
import getCardData from '/api/scanCard';

import screens from '/screen';
import { itemGalleryTypes } from '/constants/config';
import { itemTypes } from '/screen/Item/PickType';
import * as events from '/constants/events/HealthSummary/scanYourCard';
import { trackError, trackEvent } from '/state/mixpanel/mixpanel.actions';
import { selectors as profileSelectors } from '/state/profiles';
import styles, {
  crosshairDimensions,
  crosshairMarginTop,
} from './ScanInsuranceCard.styles';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ScanInsuranceCard = ({ navigation }) => {
  const [shutterDisabled, disableShutter] = useState(false);
  const profileCode = useSelector(profileSelectors.currentProfileCodeSelector);

  const dispatch = useDispatch();
  const cancelledRef = useRef(null);

  const handleTakePicturePress = async (camera) => {
    dispatch(trackEvent(events.CLICK_TAKE_PHOTO));

    disableShutter(true);
    const navParams = {
      initialType: itemTypes.insurance,
      hideTypeField: true,
    };

    if (camera) {
      const imageData = await camera.takePictureAsync({
        fixOrientation: true, // Android only
        pauseAfterCapture: true,
        quality: 0.8,
      });

      /**
       * # Image Cropping
       *
       * We want to take whatever the user had focused inside the crosshairs and crop
       * the actual image to include just that portion of the photo. We do this by
       * translating from screen space to image space, using ratios not pixel values
       */

      // Add an extra bit of padding (8px screen space) to show a little bit more
      // than what was inside the crosshairs
      const padding = 8;

      // Figure out how much of the screen the crosshairs occupt. For example: If the
      // crosshairs are 95% of the screen width and 20% of the screen height, we
      // will want the crop zone of the original photo to be [95%, 20%]
      const cropWidth = ((crosshairDimensions[0] + padding * 2) / screenWidth);
      const cropHeight = ((crosshairDimensions[1] + padding * 2) / screenHeight);

      // Since the crosshairs don't sit at [0,0] on the user's screen, we need to once again
      // translate from phone-screen space to image space

      // For x padding we figure out how much space is on either side of the crosshairs and
      // divide by 2 to get the amount of space to the left
      const offsetX = (((screenWidth - crosshairDimensions[0]) / 2 - padding) / screenWidth);
      // For y padding we just need the margin top
      const offsetY = ((crosshairMarginTop - padding) / screenHeight);

      const cropData = {
        offset: {
          x: imageData.width * offsetX,
          y: imageData.height * offsetY,
        },
        size: {
          width: imageData.width * cropWidth,
          height: imageData.height * cropHeight,
        },
      };

      const cropUrl = await ImageEditor.cropImage(imageData.uri, cropData);

      const croppedImage = {
        uri: cropUrl,
        width: cropWidth,
        height: cropHeight,
        uploadId: (new Date()).getTime(),
        newImage: true,
        mimeType: 'image/jpeg',
      };

      navParams.initialImages = [croppedImage];

      const img = await ImageResizer.createResizedImage(cropUrl, 1000, 2000, 'JPEG', 100);
      const base64 = await RNFS.readFile(img.uri, 'base64');

      try {
        const result = await getCardData(profileCode, {
          ...croppedImage,
          base64,
        });

        navParams.initialValues = {
          photoGallery: itemGalleryTypes.reviewInsuranceCard,
          displayName: result.provider,
          custom: {
            memberId: result.memberID,
            bin: result.rxBin,
            groupId: result.rxGroup,
            pcn: result.rxPCN,
            note: '',
          },
        };
      } catch (e) {
        dispatch(trackError('Mobile Scanning API XHR', e));
        navParams.initialValues = {
          photoGallery: itemGalleryTypes.reviewInsuranceCard,
          displayName: '',
          custom: {
            memberId: '',
            bin: '',
            groupId: '',
            note: '',
          },
        };
      }

      // Show a navbar for right now, because we are not showing the insurance header
      navParams.hideNav = true;
    } else {
      dispatch(trackError('Missing Camera Reference'));
      Alert.error(api.userMessages.scanInsurance.missingCameraRef);
    }


    if (cancelledRef.current) return;
    navigation.push(screens.AddItem, navParams);
  };

  const handleCancelPress = () => {
    dispatch(trackEvent(events.CLICK_CANCEL));
    // Need to use a ref here to make sure the closure in
    // handleTakePicture has the correct value when we need it
    cancelledRef.current = true;
    navigation.pop();
  };

  return (
    <View style={styles.wrapper}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: cameraMessage.permission.title,
          message: cameraMessage.permission.description,
          buttonPositive: cameraMessage.permission.buttonPositive,
          buttonNegative: cameraMessage.permission.buttonNegative,
        }}
      >
        {({ camera, status }) => {
          if (!(status === 'READY' || status === 'NOT_AUTHORIZED')) {
            return (
              <FullScreenSpinner visible />
            );
          }

          let submitAction = () => handleTakePicturePress(camera);
          let submitText = 'Take Photo';
          let Body = ScanInsuranceInstructions;

          // If the user declined the permission request let them either go to
          // their settings to change the permission, or let them manually
          // enter their insurance card details
          if (status === 'NOT_AUTHORIZED') {
            submitAction = () => navigation.push(screens.AddItem, {
              initialType: itemTypes.insurance,
              hideTypeField: true,
            });

            submitText = 'Enter insurance details manually';
            Body = ScanInsurancePermissions;
          }

          const ShutterButton = (
            <Button
              key="share"
              size="large"
              style={styles.shutterButton}
              text={submitText}
              onPress={submitAction}
              loading={shutterDisabled}
            />
          );

          const CancelButton = (
            <Button
              key="disable"
              size="large"
              text="Cancel"
              textStyle={styles.cancelButton}
              type="ghost"
              onPress={handleCancelPress}
            />
          );

          return (
            <>
              <NavigationEvents
                onDidBlur={() => {
                  if (camera) {
                    camera.resumePreview();
                    disableShutter(false);
                  }
                }}
              />
              <View style={styles.crosshair} />
              <BottomButtonLayout
                control={[ShutterButton, CancelButton]}
                bounces={false}
                style={styles.contentContainer}
              >
                <Body />
              </BottomButtonLayout>
            </>
          );
        }}
      </RNCamera>

    </View>
  );
};

ScanInsuranceCard.navigationOptions = {
  header: null,
};

export default ScanInsuranceCard;
