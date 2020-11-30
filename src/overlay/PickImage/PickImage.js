import React from 'react';
import { useDispatch } from 'react-redux';

import BottomSheet, { BottomSheetRow } from '/component/BottomSheet';

import { actions } from '/state/overlays';
import screens from '/screen';

const PickImage = ({
  onSelect,
  animation,
  navigation,
}) => {
  const dispatch = useDispatch();

  const handleCameraPress = () => {
    dispatch(actions.dismiss());
    navigation.push(screens.CameraStack, { onSelect });
  };

  const handleLibraryPress = () => {
    dispatch(actions.dismiss());
    navigation.push(screens.CameraStack, { onSelect, showCameraRoll: true });
  };

  return (
    <BottomSheet animation={animation}>
      <BottomSheetRow
        onPress={handleCameraPress}
        icon="camera"
        label="Take Photo"
        isFirst
      />
      <BottomSheetRow
        onPress={handleLibraryPress}
        icon="image"
        label="Choose from Library"
      />
    </BottomSheet>
  );
};

export default PickImage;
