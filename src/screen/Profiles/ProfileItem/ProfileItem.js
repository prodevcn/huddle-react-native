import React from 'react';
import { TouchableOpacity } from 'react-native';

import globalStyles from '/styles';
import Text from '/component/Text';
import Icon from '/component/Icon';
import Avatar from '/component/Avatar';
import Button from '/component/Button';
import TutorialAnchor from '/component/TutorialAnchor';

import { clickHandler } from '/util/offlineMode';

import styles from './ProfileItem.styles';

const ProfileItem = ({
  profile,
  active,
  normalProfileType,
  onPress,
  onManagePress,
}) => {
  if (!profile) return null;

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const showManageButton = active && normalProfileType;

  return (
    <TouchableOpacity
      style={[styles.root, active && styles.active]}
      onPress={onPress}
    >
      <Avatar profile={profile} />
      <Text.H4 style={[styles.fullNameText, active && styles.activeFullNameText]} numberOfLines={1}>
        {fullName}
      </Text.H4>

      {showManageButton && (
        <TutorialAnchor>
          <Button
            text="Manage"
            onPress={clickHandler(onManagePress)}
            size="small"
          />
        </TutorialAnchor>
      )}

      {!active && (
        <Icon
          name="chevron-right"
          color={globalStyles.palette.white}
          size={16}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfileItem;
