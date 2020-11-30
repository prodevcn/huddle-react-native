import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Button from '/component/Button';
import Icon from '/component/Icon';

import styles from './TakePicture.styles';
import sharedStyles from '/screen/Camera/Camera.styles';
import globalStyles from '/styles';

const TakePictureFooter = ({
  onRetakePress,
  onContinuePress,
}) => (
  <View style={[sharedStyles.footer, styles.footer]}>
    <Button onPress={onRetakePress} style={styles.retakeButton} type="ghost" text="Retake" />

    <TouchableOpacity
      style={[styles.shutter, styles.previewShutter]}
      onPress={onContinuePress}
    >
      <Icon
        name="checkmark"
        size={36}
        color={globalStyles.palette.white}
      />
    </TouchableOpacity>
  </View>
);

export default TakePictureFooter;
