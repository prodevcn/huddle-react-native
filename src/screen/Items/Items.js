import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import screens from '/screen';
import Text from '/component/Text';
import SearchHeader from '/navigation/header/SearchHeader';
import ItemList from '/partial/ItemList';
import ListEmptyComponent from './component/ListEmptyComponent';
import HorizontalFolderList from './component/HorizontalFolderList';
import * as events from '/constants/events/Items/items';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';

import { selectors as profileSelectors } from '/state/profiles';
import { selectors as itemsSelectors } from '/state/items';
import { selectors as foldersSelectors } from '/state/folders';
import { pluralizeName } from '/util';

import styles from './Items.styles';

const Items = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const hasItems = useSelector(itemsSelectors.hasItems);
  const activeProfile = useSelector(profileSelectors.activeProfileSelector);
  const folders = useSelector(foldersSelectors.foldersSelector);
  const items = useSelector(itemsSelectors.itemsHashSelector);

  if (!activeProfile) {
    return null;
  }

  const handleProfilesPress = () => {
    dispatch(trackEvent(events.CLICK_PROFILE));
    navigation.push(screens.ProfilesStack);
  };

  const handleSearchFocus = () => {
    dispatch(trackEvent(events.CLICK_SEARCH));
  };

  const title = `${pluralizeName(activeProfile.firstName)} Items`;

  return (
    <View style={styles.wrapper}>
      <SearchHeader
        value={searchTerm}
        onChangeText={setSearchTerm}
        profile={activeProfile}
        onAvatarPress={handleProfilesPress}
        onSearchFocus={handleSearchFocus}
        placeholder={`Search ${activeProfile.firstName}'s Items`}
      />
      <Text.H1 style={styles.title}>
        {title}
      </Text.H1>
      {hasItems && (
        <ItemList
          searchTerm={searchTerm}
          navigation={navigation}
          screenName="Items"
          ListHeaderComponent={() => (
            <HorizontalFolderList
              folders={folders}
              items={items}
              navigation={navigation}
            />
          )}
        />
      )}

      {!hasItems && (
        <ListEmptyComponent navigation={navigation} />
      )}
    </View>
  );
};

Items.navigationOptions = {
  header: null,
};

export default Items;
