import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import globalStyles from '/styles';
import Text from '/component/Text';
import Icon from '/component/Icon';
import styles from './CreateProfileButton.styles';

const CreateProfileButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.root}>
    <View style={styles.iconBlock}>
      <Icon name="plus" size={16} color={globalStyles.palette.white} />
    </View>
    <Text
      fontSize={18}
      lineHeight={24}
      weight="regular"
      color={globalStyles.palette.white}
      style={styles.text}
    >
      Create another profile
    </Text>
    <Icon name="chevron-right" color={globalStyles.palette.white} size={16} />
  </TouchableOpacity>
);

export default CreateProfileButton;
