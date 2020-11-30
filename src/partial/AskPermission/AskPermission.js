import React from 'react';
import { View } from 'react-native';

import Text from '/component/Text';
import Link from '/component/Link';
import Button from '/component/Button';
import styles from './AskPermission.styles';

const SyncContactsBanner = ({
  onConfirmPress,
  onCancelPress,
  title,
  confirmText,
  style,
}) => (
  <View style={[styles.content, style]}>
    <Text.H5>{title}</Text.H5>

    <View style={styles.buttonsBlock}>
      <Button
        text={confirmText}
        onPress={onConfirmPress}
        type="secondary"
        size="small"
      />

      <Link
        text="No Thanks"
        onPress={onCancelPress}
        style={styles.noThanksButton}
        textStyle={styles.noThanksButtonText}
      />
    </View>
  </View>
);

export default SyncContactsBanner;
