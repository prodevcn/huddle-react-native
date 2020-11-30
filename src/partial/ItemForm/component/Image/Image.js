import React from 'react';
import { TouchableOpacity, View, Image as RNImage } from 'react-native';

import Badge from '/component/Badge';
import HuddleImage from '/component/Image';

import styles, { WIDTH, HEIGHT } from './Image.styles';
import { restrictImageSize } from '/util';

const Image = ({ data, style, onRemove }) => {
  let image;

  // We will use our custom HuddleImage if we are rendering an image from the API.
  // If we are rendering an image from the ImagePicker we will use the RN image
  if (data.docUniqueName) {
    image = (
      <HuddleImage
        docUniqueName={data.docUniqueName}
        style={styles.image}
        maintainAspectRatio={false}
        thumbnailUrl={data.thumbnailUrl}
      />
    );
  } else {
    const imageSize = { width: data.width, height: data.height };
    const boxSize = { width: WIDTH, height: HEIGHT };

    const size = restrictImageSize(imageSize, boxSize);

    image = (
      <RNImage
        resizeMode="stretch"
        source={{ uri: data.uri }}
        style={[styles.image, size]}
      />
    );
  }
  return (
    <View style={[styles.card, style]}>
      {image}
      {!!onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Badge.Remove />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Image;
