import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from '/component/Text';
import Icon from '/component/Icon';

import globalStyles from '/styles';
import styles from './Image.styles';

const AddImage = ({ style, onPress }) => (
  <View style={[styles.card, style]}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.addIcon}>
        <Icon name="plus" color={globalStyles.palette.white} />
      </View>
      <Text.Label weight="medium">Add an image</Text.Label>
    </TouchableOpacity>
  </View>
);

export default AddImage;
