// todo toadums this component name and wording within should be changed from image -> document

/**
 * This component will render an image while it is uploading to s3.
 * To prevent a janky flicker when switching from this local image
 * to an image on s3, you should not switch to a normal Image, you
 * should just keep this component mounted.
 */
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import Image from '/component/Image';
import Icon from '/component/Icon';
import Text from '/component/Text';
import Document from '/component/Document';

import styles from './UploadingImage.styles';

import globalStyles from '/styles';

const UploadingImage = ({
  upload,
  file,
  style,
  imageStyle,
  onTryAgain,
}) => {
  const handleTryAgain = () => {
    onTryAgain(upload);
  };

  const isImage = upload.mimeType && upload.mimeType.match(/image/i);
  const indicatorWrapperStyle = [
    styles.wrapper,
    !isImage && styles.documentWrapper,
  ];

  const textStyle = isImage ? styles.text : styles.documentText;

  let indicator;
  if (file.failed) {
    indicator = (
      <TouchableOpacity style={indicatorWrapperStyle} onPress={handleTryAgain}>
        <Icon
          name="alert"
          color={globalStyles.palette.orange}
        />
        <Text color="white" style={textStyle}>
          Upload failed. Tap to retry.
        </Text>
      </TouchableOpacity>
    );
  } else if (!file.docUniqueName) {
    indicator = (
      <View style={indicatorWrapperStyle}>
        <ActivityIndicator size="small" color="white" style={styles.uploadingSpinner} />
        <Text style={textStyle} color="white">
          Uploading may take a minute
        </Text>
      </View>
    );
  }

  let child;

  if (isImage) {
    child = <Image style={imageStyle} tempImage={upload} />;
  } else {
    child = <Document document={upload} />;
    if (indicator) {
      child = (
        <View>
          {child}
          <BlurView blurType="light" blurAmount={2} style={styles.blur} />
        </View>
      );
    }
  }

  return (
    <View style={style}>
      {child}
      {indicator}
    </View>
  );
};

export default UploadingImage;
