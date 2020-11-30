import React from 'react';
import { View } from 'react-native';

import Text from '/component/Text';
import styles from './EmptyResults.styles';

const EmptyResults = () => (
  <View style={styles.content}>
    <Text weight="regular" color="medium" style={styles.text}>
      We could find anything in your contacts matching this.
    </Text>
    <Text weight="regular" color="medium" style={styles.text}>
      Add a valid email address or phone number and we can send an invite there.
    </Text>
  </View>
);

export default EmptyResults;
