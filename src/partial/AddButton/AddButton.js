import React from 'react';

import { TouchableOpacity } from 'react-native';

import DetailedIcon from '/component/DetailedIcon';
import Badge from '/component/Badge';
import Text from '/component/Text';

import styles from './AddButton.styles';

import useTimeout from '/hook/useTimeout';

const AddButton = ({
  style, onPress, icon = 'FileMedical', text,
}) => {
  const Icon = DetailedIcon[icon];
  const handlePress = useTimeout(onPress);

  return (
    <TouchableOpacity style={[styles.add, style]} onPress={handlePress}>
      <Icon />
      <Badge.Add style={styles.plus} />
      <Text style={styles.addText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
