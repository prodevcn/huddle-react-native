import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from '/component/Icon';

import styles from './TakePicture.styles';
import sharedStyles from '/screen/Camera/Camera.styles';
import globalStyles from '/styles';

const TakePictureFooter = ({
  takePicture,
  onCameraRollPress,
  onFlashPress,
  flashOn,
}) => (
  <View style={[sharedStyles.footer, styles.footer]}>
    <TouchableOpacity style={sharedStyles.button} onPress={onCameraRollPress}>
      <Icon name="image" size={26} color={globalStyles.palette.white} />
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.shutter]}
      onPress={takePicture}
    />

    <TouchableOpacity style={sharedStyles.button} onPress={onFlashPress}>
      <Icon
        name={`flash${flashOn ? '' : '-off'}`}
        size={28}
        color={globalStyles.palette.white}
      />
    </TouchableOpacity>
  </View>
);

export default TakePictureFooter;
