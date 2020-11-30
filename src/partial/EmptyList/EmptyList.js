import React from 'react';
import { View } from 'react-native';

import Text from '/component/Text';

import styles from './EmptyList.styles';

const EmptyList = ({
  children,
  style,
  textStyle,
}) => (
  <View style={[styles.wrapper, style]}>
    <Text.BodySmall
      weight="medium"
      color="medium"
      style={[styles.text, textStyle]}
    >
      {children}
    </Text.BodySmall>
  </View>
);

export default EmptyList;
