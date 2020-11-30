import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '/component/Icon';

import Text from '/component/Text';
import Avatar from '/component/Avatar';

import styles from './ProfileItem.styles';

const ProfileItem = ({ onPress, profile, style }) => (
  <TouchableOpacity
    style={[styles.wrapper, style]}
    onPress={onPress}
    testID="profile"
  >
    <Avatar style={styles.avatar} profile={profile} />

    <Text.H4 color="white" style={styles.text}>
      {profile.firstName}
      {' '}
      {profile.lastName}
    </Text.H4>
    <Icon name="chevron-right" color="white" />
  </TouchableOpacity>
);

export default ProfileItem;
