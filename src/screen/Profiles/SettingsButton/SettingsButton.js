import React from 'react';
import { TouchableOpacity } from 'react-native';

import globalStyles from '/styles';
import Text from '/component/Text';
import Icon from '/component/Icon';
import styles from './SettingsButton.styles';

import useTimeout from '/hook/useTimeout';

const SettingsButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={useTimeout(onPress)}
    style={styles.root}
    testID="user-settings"
  >
    <Icon name="settings" color={globalStyles.palette.white} />
    <Text
      fontSize={18}
      lineHeight={24}
      weight="regular"
      color={globalStyles.palette.white}
      style={styles.text}
    >
      Settings & preferences
    </Text>
    <Icon name="chevron-right" color={globalStyles.palette.white} size={16} />
  </TouchableOpacity>
);

export default SettingsButton;
