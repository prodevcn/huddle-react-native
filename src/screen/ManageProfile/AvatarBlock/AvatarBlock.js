import React, { useState } from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { readFile } from 'react-native-fs';
import { useDispatch } from 'react-redux';

import Avatar from '/component/Avatar';
import Button from '/component/Button';
import PickImage from '/overlay/PickImage';
import * as events from '/constants/events/ManageProfiles/manageProfile';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { actions as overlayActions } from '/state/overlays';

import styles from './AvatarBlock.styles';

const AvatarBlock = ({ navigation, profile, onChange }) => {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  // The react-native-image-crop-picker UI doesn't support dark mode very well so for
  // right now we will show the other image picker, then pass the image into the cropper
  const onSelect = async (data) => {
    const image = await ImagePicker.openCropper({
      path: data.uri,
      // Avatars are max 64px in diameter, but we want them to be high res, so
      // I am making them be `@3x` (64 * 3 = 192)
      width: 128,
      height: 128,
      cropperCircleOverlay: true,
    });

    const base64 = await readFile(image.path, 'base64');
    const avatar = `data:image/jpeg;base64,${base64}`;

    onChange(avatar);
    setPreview(avatar);
  };

  const handleChangePress = () => {
    dispatch(trackEvent(events.CLICK_SET_PHOTO));

    dispatch(overlayActions.show(PickImage, {
      onSelect,
      navigation,
    }));
  };

  const buttonText = profile.avatar ? 'Change photo' : 'Set photo';

  return (
    <View style={styles.root}>
      <Avatar profile={profile} size="large" style={styles.avatar} preview={preview} />
      <Button text={buttonText} onPress={handleChangePress} size="small" style={styles.button} />
    </View>
  );
};

export default AvatarBlock;
