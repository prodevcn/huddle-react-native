import React from 'react';
import { View } from 'react-native';

import Text from '/component/Text';
import styles from './BulletedListItem.styles';

const BulletedListItem = ({ children }) => (
  <View style={styles.content}>
    <Text color="medium">
      {'\u2022  '}
    </Text>
    {children}
  </View>
);

export default BulletedListItem;
