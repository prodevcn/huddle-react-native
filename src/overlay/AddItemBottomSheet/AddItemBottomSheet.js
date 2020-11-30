import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '/api';
import screens from '/screen';
import Alert from '/overlay/Alert';
import { actions as itemActions } from '/state/items';
import { actions as overlayActions } from '/state/overlays';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import BottomSheet, { BottomSheetRow } from '/component/BottomSheet';
import TextArea from '/overlay/ModalTextArea';
import { selectors } from '/state/profiles';
import * as events from '/constants/events/Items/addItem';

import { overlayAnimationDuration } from '/constants/config';
import { itemTypes } from '/screen/Item/PickType';

const AddItemBottomSheet = ({ navigation, animation }) => {
  const readOnlyActiveProfile = useSelector(selectors.readOnlyActiveProfileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (readOnlyActiveProfile) {
      dispatch(overlayActions.dismiss());
      Alert.error(api.userMessages.upload.readOnlyActiveProfile);
    }
  }, [readOnlyActiveProfile]);

  // Either launch the camera or show the image picker. If the user takes or selects a
  // photo it will push the item stack with that image pre-populated
  const handleImagePress = (camera) => () => {
    const event = camera ? events.CLICK_ADD_ITEM_CAMERA : events.CLICK_ADD_ITEM_CAMERAROLL;
    dispatch(trackEvent(event));

    dispatch(overlayActions.dismiss());
    setTimeout(() => {
      navigation.push(screens.CameraStack, {
        showCameraRoll: !camera,
        onSelect: (response) => {
          if (response.didCancel) return;

          if (response.error) {
            Alert.error(api.userMessages.camera.error);
            return;
          }

          navigation.push(screens.AddItemStack, {
            initialImages: [{
              ...response,
              newImage: true,
              mimeType: 'image/jpeg',
              uploadId: (new Date()).getTime(),
            }],
            initialType: itemTypes.other,
            generateName: true,
            showPickType: false,
            gotoItemTab: true,
          });
        },
      });
    }, overlayAnimationDuration);
  };

  // Show the item form, with nothing pre-populated
  const handleAddItemPress = () => {
    dispatch(trackEvent(events.CLICK_ADD_ITEM_OTHER));

    dispatch(overlayActions.dismiss());
    setTimeout(() => {
      navigation.push(screens.AddItemStack, {
        initialType: itemTypes.other,
        generateName: true,
        showPickType: true,
        gotoItemTab: true,
      });
    }, overlayAnimationDuration);
  };

  // Show the note picker
  const handleAddNotePress = () => {
    dispatch(trackEvent(events.CLICK_ADD_ITEM_NOTE));

    dispatch(overlayActions.show(TextArea, {
      navigation,
      showTitle: true,
      placeholder: 'Start typing your note here...',
      titlePlaceholder: 'What should we call this note?',
      buttonText: 'Save & Upload',
      onSubmit: async ({ title, value }) => {
        try {
          await dispatch(itemActions.addNote(title, value));
          navigation.navigate(screens.Items);

          // The overlay will be dismissed in the ModalTextArea, wait until
          // it's animation finishes and then show the user the item
          setTimeout(() => {
            Alert.success(api.userMessages.upload.noteUploadSuccess);
          }, overlayAnimationDuration);
        } catch (e) {
          Alert.error(api.userMessages.upload.failed);
        }
      },
    }));
  };

  return (
    <BottomSheet animation={animation}>
      <BottomSheetRow
        onPress={handleImagePress(true)}
        icon="Camera"
        label="Use camera"
      />
      <BottomSheetRow
        onPress={handleImagePress()}
        icon="FileMedical"
        label="Upload photos"
      />
      <BottomSheetRow
        onPress={handleAddNotePress}
        icon="NoteCreate"
        label="Create note"
      />
      <BottomSheetRow
        onPress={handleAddItemPress}
        icon="Other"
        label="Add other"
      />
    </BottomSheet>
  );
};

export default AddItemBottomSheet;
