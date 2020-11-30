import React from 'react';

import { TouchableOpacity, Linking } from 'react-native';

import Text from '/component/Text';

import styles from './ScanInsurancePermissions.styles';

const ScanInsurancePermissions = () => {
  const handleSettingsPress = () => {
    Linking.openSettings();
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handleSettingsPress}>
      <Text weight="medium" color="medium" style={styles.text}>
        Huddle does not have access to your camera.
        Tap here to open your settings to grant access.
      </Text>

    </TouchableOpacity>
  );
};

export default ScanInsurancePermissions;
