import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from '/component/Icon';

import styles from './DarkModalHeader.styles';
import globalStyles from '/styles';

const DarkModalHeader = ({
  icon = 'cross',
  onClose,
  style,
  hideIcon,
}) => {
  const Child = hideIcon ? View : TouchableOpacity;

  return (
    <View style={[styles.header, style]}>
      <Child style={styles.close} onPress={onClose}>
        {!hideIcon && (
          <Icon name={icon} color={globalStyles.palette.white} />
        )}
      </Child>
    </View>
  );
};

export default DarkModalHeader;
