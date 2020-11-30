import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import SearchInput from '/component/SearchInput';
import Avatar from '/component/Avatar';
import TutorialAnchor from '/component/TutorialAnchor';

import styles from './SearchHeader.styles';

import { ANCHORS } from '/tutorial/constants';

import useTimeout from '/hook/useTimeout';

const SearchHeader = ({
  onAvatarPress,
  profile,
  value,
  onChangeText,
  onSearchFocus,
  placeholder = '',
}) => {
  const handlePress = useTimeout(onAvatarPress);

  return (
    <View style={styles.headerWrapper}>
      <SearchInput
        style={styles.input}
        value={value}
        onFocus={onSearchFocus}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      <TutorialAnchor name={ANCHORS.ProfileButton}>
        <TouchableOpacity
          onPress={handlePress}
          testID="user-menu"
        >
          <Avatar profile={profile} />
        </TouchableOpacity>
      </TutorialAnchor>
    </View>
  );
};

export default SearchHeader;
